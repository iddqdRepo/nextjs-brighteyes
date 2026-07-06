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

        if (!/^[a-zA-Z0-9._-]{2,32}$/.test(username)) {
          return res.status(400).json({
            success: false,
            message:
              "Usernames are 2-32 letters, numbers, dots, dashes or underscores.",
          });
        }
        //"me" is the change-your-own-password route (/api/users/me), which
        //shadows /api/users/<name> — an account with that name could never
        //be managed, and resetting "me" would change the requester instead.
        if (username.toLowerCase() === "me") {
          return res.status(400).json({
            success: false,
            message: "That username is reserved — please pick another.",
          });
        }

        if (password.length < 8) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters.",
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
        try {
          const user = await userModel.create({
            username,
            password: hash,
            ...access,
          });
          return res.status(201).json({
            success: true,
            data: { _id: user._id, username: user.username, role: user.role },
          });
        } catch (error) {
          //The unique index catches a double-click racing past the findOne.
          if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
              success: false,
              message: `A user called ${username} already exists`,
            });
          }
          throw error;
        }
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
