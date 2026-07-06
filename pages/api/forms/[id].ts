import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";
import { FORBIDDEN_MESSAGE, getAdminUser } from "../../../utils/auth";

const modelByType = (type: unknown): Model<any> | null => {
  switch (type) {
    case "pet":
      return formModels.FormPetAdoptionModel;
    case "giftaid":
      return formModels.FormGiftAidModel;
    case "volunteer":
      return formModels.FormVolunteerModel;
    case "contactus":
      return formModels.FormContactUsModel;
    default:
      return null;
  }
};

const INVALID_TYPE_MESSAGE =
  "Please add a valid query type e.g. api/forms/<id>?type=volunteer";

//Only fields the form's schema declares may be set via the API, so a client
//cannot inject arbitrary properties (e.g. _id, __v) through the request body.
const pickSchemaFields = (
  model: Model<any>,
  body: Record<string, unknown> = {}
) => {
  const allowed = new Set(
    Object.keys(model.schema.paths).map((path) => path.split(".")[0])
  );
  allowed.delete("_id");
  allowed.delete("__v");

  const update: Record<string, unknown> = {};
  for (const key of Object.keys(body)) {
    if (allowed.has(key)) {
      update[key] = body[key];
    }
  }
  update.updatedAt = new Date();
  return update;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const id = query.id;
  const type = query.type;

  //Every operation on a single submission needs the forms permission, since
  //submissions contain applicants' personal data. Deleting is permanent
  //(archive is the everyday flow), so it is reserved for superusers.
  const user = await getAdminUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (!user.permissions.forms) {
    return res.status(403).json({ success: false, message: FORBIDDEN_MESSAGE });
  }
  if (method === "DELETE" && !user.isSuperuser) {
    return res.status(403).json({ success: false, message: FORBIDDEN_MESSAGE });
  }

  const model = modelByType(type);
  if (!model) {
    return res
      .status(400)
      .json({ success: false, message: INVALID_TYPE_MESSAGE });
  }

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        const form = await model.findById(id);
        if (!form) {
          return res.status(404).json({
            success: false,
            message: `No ${type} form with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `${type} form ${id} successfully retrieved`,
          data: form,
        });
      }

      case "PUT": {
        const update = pickSchemaFields(model, req.body);

        //Tracking fields are stamped here from the authenticated requester,
        //never taken from the client.
        delete update.notes;
        delete update.handledBy;
        delete update.handledAt;

        if (update.status !== undefined) {
          if (update.status !== "new" && update.status !== "handled") {
            return res.status(400).json({
              success: false,
              message: "status must be 'new' or 'handled'",
            });
          }
          //Whole-form updates (e.g. archiving) echo the current status back;
          //only an actual change re-stamps who is handling it.
          const existing = await model.findById(id, { status: 1 }).lean();
          if (!existing) {
            return res.status(404).json({
              success: false,
              message: `No ${type} form with ID of ${id} exists`,
            });
          }
          const currentStatus = (existing as { status?: string }).status;
          if (update.status !== (currentStatus ?? "new")) {
            update.handledBy =
              update.status === "handled" ? user.username : null;
            update.handledAt = update.status === "handled" ? new Date() : null;
          }
        }

        //Tracking and filing updates must not bump updatedAt — the admin
        //tables display it as the submission date, and archiving a June form
        //must not relabel it as submitted today.
        const trackingKeys = [
          "updatedAt",
          "status",
          "handledBy",
          "handledAt",
          "read",
          "archive",
        ];
        if (Object.keys(update).every((key) => trackingKeys.includes(key))) {
          delete update.updatedAt;
        }

        const operations: Record<string, unknown> = { $set: update };
        const noteText =
          typeof req.body.addNote === "string" ? req.body.addNote.trim() : "";
        if (noteText) {
          operations.$push = {
            notes: {
              text: noteText.slice(0, 2000),
              by: user.username,
              date: new Date(),
            },
          };
        }

        const form = await model.findByIdAndUpdate(id, operations, {
          new: true,
          runValidators: true,
        });
        if (!form) {
          return res.status(404).json({
            success: false,
            message: `No ${type} form with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `${type} form ${id} successfully updated`,
          data: form,
        });
      }

      case "DELETE": {
        const form = await model.deleteOne({ _id: id });
        if (!form.deletedCount) {
          return res.status(404).json({
            success: false,
            message: `No ${type} form with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `${type} form ${id} successfully deleted`,
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
    console.error("api/forms/[id] error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
