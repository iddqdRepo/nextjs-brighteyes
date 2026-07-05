import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";
import { requireAuth } from "../../../utils/auth";

//Only username/password may be changed, and a new password is always hashed
//so a plaintext password can never be written to the database.
const buildUserUpdate = (body: Record<string, unknown> = {}) => {
  const update: Record<string, unknown> = {};
  if (typeof body.username === "string" && body.username) {
    update.username = body.username;
  }
  if (typeof body.password === "string" && body.password) {
    update.password = bcrypt.hashSync(body.password, 10);
  }
  return update;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const passedInUser = query.username;

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        const user = await userModel
          .findOne({ username: passedInUser }, { password: 0 })
          .lean();
        if (!user) {
          return res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `user ${passedInUser} successfully retrieved`,
          data: [user],
        });
      }

      case "PUT": {
        const update = buildUserUpdate(req.body);
        const user = await userModel.findOneAndUpdate(
          { username: passedInUser },
          update,
          { new: true, runValidators: true, projection: { password: 0 } }
        );
        if (!user) {
          return res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `user ${passedInUser} successfully updated`,
          data: user,
        });
      }

      case "DELETE": {
        const user = await userModel.deleteOne({ username: passedInUser });
        if (!user.deletedCount) {
          return res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `user ${passedInUser} successfully deleted`,
          data: {},
        });
      }

      default:
        res.setHeader("Allow", "GET, PUT, DELETE");
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("api/users/[username] error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default requireAuth(handler);
