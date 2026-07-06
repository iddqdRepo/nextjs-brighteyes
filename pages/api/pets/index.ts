import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import { FORBIDDEN_MESSAGE, getAdminUser } from "../../../utils/auth";
import { isDataUri, uploadPetImage } from "../../../utils/cloudinary";

//A baked photo travels as a base64 data URL in the JSON body; Next's default
//1mb limit rejected larger photos with a 413. 4mb matches Vercel's platform
//cap and is far above any bake the cropper produces.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

//Only fields the admin form actually collects; stops raw API calls from
//injecting _id or creating empty ghost records.
const PET_FIELDS = [
  "type",
  "name",
  "age",
  "sex",
  "yearsOrMonths",
  "breed",
  "size",
  "image",
  "suitableForChildren",
  "suitableForAnimals",
  "adopted",
  "desc",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const NotAdopted = query.adopted;

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        if (NotAdopted) {
          //Public: the animals currently available for adoption.
          const pets = await petModel.find({ adopted: "No" });
          return res.status(200).json({ success: true, data: pets });
        }

        //Admin only: the full list including adopted animals. Images are
        //Cloudinary URLs (migrated 2026), so including them stays well under
        //Vercel's 4mb response limit that base64 images used to exceed.
        //Resolved from the DB (not just the JWT) so a deleted account's
        //still-valid cookie stops working, like every other admin route.
        if (!(await getAdminUser(req))) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const pets = await petModel.find({});
        return res.status(200).json({ success: true, data: pets });
      }

      case "POST": {
        const user = await getAdminUser(req);
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        if (!user.permissions.animals) {
          return res
            .status(403)
            .json({ success: false, message: FORBIDDEN_MESSAGE });
        }
        const body: Record<string, unknown> = {};
        for (const key of PET_FIELDS) {
          if (req.body?.[key] !== undefined) {
            body[key] = req.body[key];
          }
        }
        if (!body.name || !body.type) {
          return res
            .status(400)
            .json({ success: false, message: "name and type are required" });
        }
        //Anything but an explicit "Yes" lists the animal as available, so a
        //malformed value can't create a pet invisible to both admin views.
        if (body.adopted !== "Yes") {
          body.adopted = "No";
        }
        //Inline base64 images go to Cloudinary; Mongo only stores the URL.
        if (isDataUri(body.image)) {
          body.image = await uploadPetImage(body.image as string);
        }
        const pets = await petModel.create(body);
        return res.status(201).json({ success: true, data: pets });
      }

      default:
        res.setHeader("Allow", "GET, POST");
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("api/pets error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
