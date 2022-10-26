import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  console.log("params", query);
  switch (method) {
    case "GET":
      try {
        if (query.type === "pet") {
          const petForm = await formModels.FormPetAdoptionModel.find();
          console.log("Retrieved all pet forms from api/forms.ts");

          res.status(200).json(petForm);
        } else if (query.type === "giftaid") {
          console.log("Retrieved all giftaid forms from api/forms.ts");

          const giftAidForm = await formModels.FormGiftAidModel.find();
          res.status(200).json(giftAidForm);
        } else if (query.type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.find();

          console.log("Retrieved all volunteer forms from api/forms.ts");
          res.status(200).json(volunteerForm);
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
          console.log("Retrieved all pet forms from api/forms.ts");

          res.status(201).json({ success: true, data: petForm });
        } else if (query.type === "giftaid") {
          console.log("Retrieved all giftaid forms from api/forms.ts");

          const giftAidForm = await formModels.FormGiftAidModel.create(
            req.body
          );
          res.status(201).json({ success: true, data: giftAidForm });
        } else if (query.type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.create(
            req.body
          );

          console.log("Retrieved all volunteer forms from api/forms.ts");
          res.status(201).json({ success: true, data: volunteerForm });
        } else {
          res
            .status(404)
            .json(
              "ERROR posting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        console.log("error posting products in api/forms.ts");
        res.status(404).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
