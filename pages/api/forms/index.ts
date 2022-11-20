import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  switch (method) {
    case "GET":
      try {
        if (query.type === "pet") {
          const petForm = await formModels.FormPetAdoptionModel.find();
          res.status(200).json({ success: true, data: petForm });
        } else if (query.type === "giftaid") {
          const giftAidForm = await formModels.FormGiftAidModel.find();
          res.status(200).json({ success: true, data: giftAidForm });
        } else if (query.type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.find();
          res.status(200).json({ success: true, data: volunteerForm });
        } else if (query.type === "contactus") {
          const contactUsForm = await formModels.FormContactUsModel.find();
          res.status(200).json({ success: true, data: contactUsForm });
        } else {
          res
            .status(404)
            .json(
              "ERROR getting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        console.log("error retrieving products in api/forms.ts");
        res.status(404).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        if (query.type === "pet") {
          const petForm = await formModels.FormPetAdoptionModel.create(
            req.body
          );
          res.status(201).json({ success: true, data: petForm });
        } else if (query.type === "giftaid") {
          const giftAidForm = await formModels.FormGiftAidModel.create(
            req.body
          );
          res.status(201).json({ success: true, data: giftAidForm });
        } else if (query.type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.create(
            req.body
          );
          res.status(201).json({ success: true, data: volunteerForm });
        } else if (query.type === "contactus") {
          console.log("API");
          const contactUsForm = await formModels.FormContactUsModel.create(
            req.body
          );
          res.status(201).json({ success: true, data: contactUsForm });
        } else {
          res
            .status(404)
            .json(
              "ERROR posting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
