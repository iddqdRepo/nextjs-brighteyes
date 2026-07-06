import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import { getAdminUser } from "../../../utils/auth";

//Lets any signed-in admin change their own password from the Settings page.
//Managing other accounts (access, resets, removal) stays superuser-only in
///api/users; this route can only ever touch the requester's own record.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const requester = await getAdminUser(req);
    if (!requester) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const password = req.body?.password;
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    await dbConnect();
    await userModel.updateOne(
      { username: requester.username },
      { password: bcrypt.hashSync(password, 10) }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.error("api/users/me error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
