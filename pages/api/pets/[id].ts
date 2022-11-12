import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const id = query.id;

  switch (method) {
    case "GET":
      try {
        const pet = await petModel.findById(id);
        if (!pet) {
          res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
          res.end();
        } else {
          res.status(200).json({
            success: true,
            message: `pet ${id} successfully retrieved`,
            data: pet,
          });
          res.end();
        }
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const pet = await petModel.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!pet) {
          res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `pet ${id} successfully updated`,
            data: req.body,
          });
          res.end();
        }
      } catch (error: any) {
        res.status(404).json({ success: false, message: error });
      }
      break;
    case "DELETE":
      try {
        const pet = await petModel.deleteOne({
          _id: id,
        });
        if (!pet.deletedCount) {
          res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `pet ${id} successfully deleted`,
            data: {},
          });
          res.end();
        }
      } catch (error: any) {
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
