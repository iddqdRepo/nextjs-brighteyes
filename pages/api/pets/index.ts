import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import { getAuthUser } from "../../../utils/auth";

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

        //Admin only: the full list including adopted animals.
        //^ Image excluded as the res exceeded 4mb so vercel returned err 500
        if (!getAuthUser(req)) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const pets = await petModel.find({}, { image: 0 });
        return res.status(200).json({ success: true, data: pets });
      }

      case "POST": {
        if (!getAuthUser(req)) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const pets = await petModel.create(req.body);
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
