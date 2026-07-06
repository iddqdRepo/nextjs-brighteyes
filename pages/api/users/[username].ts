import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";
import { AdminUser, requireSuperuser, toAdminUser } from "../../../utils/auth";
import { parseAccessFields } from "../../../utils/userAccess";

//Superusers counted straight from the database; accounts with no role predate
//roles and have always had full access, so they count too.
const countSuperusers = () =>
  userModel.countDocuments({ role: { $ne: "staff" } });

//Team management is superuser-only. Everything here guards against the team
//locking itself out: you cannot remove or demote your own account, nor the
//last remaining superuser.
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  requester: AdminUser
) => {
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
        const body = req.body || {};
        const update: Record<string, unknown> = {};

        //A new password is always hashed, so a plaintext password can never
        //be written to the database.
        if (typeof body.password === "string" && body.password) {
          if (body.password.length < 8) {
            return res.status(400).json({
              success: false,
              message: "Password must be at least 8 characters.",
            });
          }
          update.password = bcrypt.hashSync(body.password, 10);
        }

        if (body.role !== undefined || body.permissions !== undefined) {
          const access = parseAccessFields(body);
          if (!access) {
            return res.status(400).json({
              success: false,
              message: "role must be 'superuser' or 'staff'",
            });
          }

          if (access.role === "staff") {
            if (passedInUser === requester.username) {
              return res.status(400).json({
                success: false,
                message: "You can't remove your own superuser access.",
              });
            }
            const target = await userModel
              .findOne({ username: passedInUser })
              .lean<{ username: string; role?: string } | null>();
            if (
              target &&
              toAdminUser(target).isSuperuser &&
              (await countSuperusers()) <= 1
            ) {
              return res.status(400).json({
                success: false,
                message: "The team needs at least one superuser.",
              });
            }
            update.permissions = access.permissions;
          }
          update.role = access.role;
        }

        if (Object.keys(update).length === 0) {
          return res.status(400).json({
            success: false,
            message: "Nothing to update",
          });
        }

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

        //Belt and braces for the count-then-write race: if two superusers
        //demote each other simultaneously, both pass the pre-check above.
        //Re-checking after the write and undoing keeps at least one.
        if (update.role === "staff" && (await countSuperusers()) === 0) {
          await userModel.updateOne(
            { username: passedInUser },
            { role: "superuser" }
          );
          return res.status(400).json({
            success: false,
            message: "The team needs at least one superuser.",
          });
        }

        return res.status(200).json({
          success: true,
          message: `user ${passedInUser} successfully updated`,
          data: user,
        });
      }

      case "DELETE": {
        if (passedInUser === requester.username) {
          return res.status(400).json({
            success: false,
            message: "You can't remove your own account.",
          });
        }

        const target = await userModel
          .findOne({ username: passedInUser })
          .lean<{ username: string; role?: string } | null>();
        if (!target) {
          return res.status(404).json({
            success: false,
            message: `No user with username of ${passedInUser} exists`,
          });
        }
        if (toAdminUser(target).isSuperuser && (await countSuperusers()) <= 1) {
          return res.status(400).json({
            success: false,
            message: "The team needs at least one superuser.",
          });
        }

        await userModel.deleteOne({ username: passedInUser });

        //Same race guard as PUT: two superusers deleting each other can both
        //pass the pre-check, so restore this account if it was the last one.
        if (
          toAdminUser(target).isSuperuser &&
          (await countSuperusers()) === 0
        ) {
          await userModel.create(target);
          return res.status(400).json({
            success: false,
            message: "The team needs at least one superuser.",
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

export default requireSuperuser(handler);
