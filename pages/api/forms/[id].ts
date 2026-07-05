import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const id = query.id;
  const type = query.type;

  async function get(type: string, model: Model<any, {}, {}, {}, any>) {
    const form = await model.findById(id);
    if (!form) {
      res.status(404).json({
        success: false,
        message: `No ${type} form with ID of ${id} exists`,
      });
      res.end();
    } else {
      res.status(200).json({
        success: true,
        message: `${type} form ${id} successfully retrieved`,
        data: form,
      });
      res.end();
    }
  }

  async function put(type: string, model: Model<any, {}, {}, {}, any>) {
    const form = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!form) {
      res.status(404).json({
        success: false,
        message: `No ${type} form with ID of ${id} exists`,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `${type} form ${id} successfully updated`,
        data: req.body,
      });
      res.end();
    }
  }
  async function del(type: string, model: Model<any, {}, {}, {}>) {
    const form = await model.deleteOne({
      _id: id,
    });
    if (!form.deletedCount) {
      res.status(404).json({
        success: false,
        message: `No ${type} form with ID of ${id} exists`,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `${type} form ${id} successfully deleted`,
        data: {},
      });
      res.end();
    }
  }

  switch (method) {
    case "GET":
      try {
        if (type === "pet") {
          await get("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          await get("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          await get("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          await get("contactus", formModels.FormContactUsModel);
        } else {
          res
            .status(404)
            .json(
              "ERROR getting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "PUT":
      try {
        if (type === "pet") {
          await put("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          await put("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          await put("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          await put("contactus", formModels.FormContactUsModel);
        } else {
          res
            .status(404)
            .json(
              "ERROR getting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        console.log("error posting pet in api/forms.ts");
        res.status(404).json({ success: false, message: error });
      }
      break;
    case "DELETE":
      try {
        if (type === "pet") {
          await del("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          await del("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          await del("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          await del("contactus", formModels.FormContactUsModel);
        } else {
          res
            .status(404)
            .json(
              "ERROR getting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        console.log("error posting pet in api/forms.ts");
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
