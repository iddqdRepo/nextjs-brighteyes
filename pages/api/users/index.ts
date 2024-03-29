import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const users = await userModel.find();
        res.status(200).json({ success: true, data: users });
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const username = req.body.username;
        const hash = bcrypt.hashSync(req.body.password, 10);
        const user = await userModel.create({ username, password: hash });
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
