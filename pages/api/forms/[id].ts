import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
          get("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          get("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          get("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          get("contactus", formModels.FormContactUsModel);
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
          put("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          put("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          put("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          put("contactus", formModels.FormContactUsModel);
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
          del("pet", formModels.FormPetAdoptionModel);
        } else if (type === "giftaid") {
          del("giftaid", formModels.FormGiftAidModel);
        } else if (type === "volunteer") {
          del("volunteer", formModels.FormVolunteerModel);
        } else if (type === "contactus") {
          del("contactus", formModels.FormContactUsModel);
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
};
