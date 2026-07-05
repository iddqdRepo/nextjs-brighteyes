import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import {
  FORBIDDEN_MESSAGE,
  getAdminUser,
  getAuthUser,
} from "../../../utils/auth";
import { isDataUri, uploadPetImage } from "../../../utils/cloudinary";

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
        if (!getAuthUser(req)) {
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
        const body = { ...req.body };
        //Inline base64 images go to Cloudinary; Mongo only stores the URL.
        if (isDataUri(body.image)) {
          body.image = await uploadPetImage(body.image);
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
