import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { method } = req;
  const { method, query } = req;
  const NotAdopted = query.adopted;
  console.log("method", method);
  switch (method) {
    case "GET":
      try {
        if (NotAdopted) {
          const pets = await petModel.find({ adopted: "No" });
          res.status(200).json({ success: true, data: pets });
        } else {
          console.log("api method", method);
          //^ Had to exclude image as the res exceeded 4mb so vercel returned err 500
          const pets = await petModel.find({}, { image: 0 });

          res.status(200).json({ success: true, data: pets });
        }
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const pets = await petModel.create(req.body);
        res.status(201).json({ success: true, data: pets });
      } catch (error: any) {
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
