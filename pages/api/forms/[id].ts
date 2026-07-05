import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";
import { getAuthUser } from "../../../utils/auth";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const id = query.id;
  const type = query.type;

  //Every operation on a single submission is admin only.
  if (!getAuthUser(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
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
        const form = await model.findByIdAndUpdate(id, req.body, {
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
