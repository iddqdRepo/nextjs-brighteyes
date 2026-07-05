import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";
import { requireSuperuser } from "../../../utils/auth";
import { parseAccessFields } from "../../../utils/userAccess";

//Team management is superuser-only: staff accounts can neither list the
//other accounts nor create new ones.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        const users = await userModel.find({}, { password: 0 });
        return res.status(200).json({ success: true, data: users });
      }

      case "POST": {
        const { username, password } = req.body || {};
        if (
          typeof username !== "string" ||
          typeof password !== "string" ||
          !username ||
          !password
        ) {
          return res.status(400).json({
            success: false,
            message: "username and password are required",
          });
        }

        const access = parseAccessFields(req.body);
        if (!access) {
          return res.status(400).json({
            success: false,
            message: "role must be 'superuser' or 'staff'",
          });
        }

        const existing = await userModel.findOne({ username }).lean();
        if (existing) {
          return res.status(409).json({
            success: false,
            message: `A user called ${username} already exists`,
          });
        }

        const hash = bcrypt.hashSync(password, 10);
        const user = await userModel.create({
          username,
          password: hash,
          ...access,
        });
        return res.status(201).json({
          success: true,
          data: { _id: user._id, username: user.username, role: user.role },
        });
      }

      default:
        res.setHeader("Allow", "GET, POST");
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("api/users error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default requireSuperuser(handler);
