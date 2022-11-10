import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const username = query.username;
  switch (method) {
    case "GET":
      try {
        const user = await userModel.find({ username: username });
        if (!user) {
          res.status(404).json({
            success: false,
            message: `No user with username of ${username} exists`,
          });
          res.end();
        } else {
          res.status(200).json({
            success: true,
            message: `user ${username} successfully retrieved`,
            data: user,
          });
          res.end();
        }
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const user = await userModel.findOneAndUpdate(
          { username: username },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!user) {
          res.status(404).json({
            success: false,
            message: `No user with username of ${username} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `user ${username} successfully updated`,
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
        const user = await userModel.deleteOne({
          username: username,
        });
        if (!user.deletedCount) {
          res.status(404).json({
            success: false,
            message: `No user with username of ${username} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `user ${username} successfully deleted`,
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
