import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const pets = await petModel.find();
        res.status(200).json({ success: true, data: pets });
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
