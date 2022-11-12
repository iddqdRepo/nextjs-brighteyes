import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const passedInUser = query.username;
  console.log("query", query);
  console.log("method", method);

  switch (method) {
    case "GET":
      try {
        const user = await userModel.find({ username: passedInUser }).lean();
        if (!user[0]) {
          res.status(200).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `user ${passedInUser} successfully retrieved`,
            data: user,
          });
        }
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const user = await userModel.findOneAndUpdate(
          { username: passedInUser },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!user) {
          res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `user ${passedInUser} successfully updated`,
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
          username: passedInUser,
        });
        if (!user.deletedCount) {
          res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `user ${passedInUser} successfully deleted`,
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
