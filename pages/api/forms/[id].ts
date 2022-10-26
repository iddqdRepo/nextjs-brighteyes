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
    const petForm = await model.findById(id);
    console.log(`Retrieved all ${type} forms from api/forms.ts`);
    if (!petForm) {
      res.status(404).json({
        success: false,
        message: `No ${type} form with ID of ${id} exists`,
      });
    }
    res.status(200).json(petForm);
  }

  switch (method) {
    case "GET":
      try {
        if (type === "pet") {
          get("pet", formModels.FormPetAdoptionModel);
          //   const petForm = await formModels.FormPetAdoptionModel.findById(id);
          //   console.log("Retrieved all pet forms from api/forms.ts");
          //   if (!petForm) {
          //     res.status(404).json({
          //       success: false,
          //       message: `No pet form with ID of ${id} exists`,
          //     });
          //   }
          //   res.status(200).json(petForm);
        } else if (type === "giftaid") {
          get("giftaid", formModels.FormGiftAidModel);

          //   console.log("Retrieved all giftaid forms from api/forms.ts");

          //   const giftAidForm = await formModels.FormGiftAidModel.findById(id);
          //   res.status(200).json(giftAidForm);
        } else if (type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.findById(
            id
          );

          console.log("Retrieved all volunteer forms from api/forms.ts");
          res.status(200).json(volunteerForm);
        } else {
          console.log("In else get form by id");
          res
            .status(404)
            .json(
              "ERROR getting, Please add a query type e.g. api/forms?type=volunteer"
            );
        }
      } catch (error: any) {
        console.log("error retrieving forms in api/forms.ts");
        res.status(404).json({ message: error.message });
      }
      break;
    case "PUT":
      try {
        if (type === "pet") {
          const petForm =
            await formModels.FormPetAdoptionModel.findByIdAndUpdate(
              id,
              req.body,
              {
                new: true,
                runValidators: true,
              }
            );

          if (!petForm) {
            res.status(404).json({
              success: false,
              message: `No pet form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `pet form ${id} successfully updated`,
            data: req.body,
          });
        } else if (type === "giftaid") {
          const giftAidForm =
            await formModels.FormGiftAidModel.findByIdAndUpdate(id, req.body, {
              new: true,
              runValidators: true,
            });

          if (!giftAidForm) {
            res.status(404).json({
              success: false,
              message: `No giftAid form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `giftAid form ${id} successfully updated`,
            data: req.body,
          });
        } else if (type === "volunteer") {
          const volunteerForm =
            await formModels.FormVolunteerModel.findByIdAndUpdate(
              id,
              req.body,
              {
                new: true,
                runValidators: true,
              }
            );

          if (!volunteerForm) {
            res.status(404).json({
              success: false,
              message: `No volunteer form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `volunteer form ${id} successfully updated`,
            data: req.body,
          });
        }
      } catch (error: any) {
        console.log("error posting products in api/forms.ts");
        res.status(404).json({ success: false, message: error });
      }
      break;
    case "DELETE":
      try {
        if (type === "pet") {
          const petForm = await formModels.FormPetAdoptionModel.deleteOne({
            _id: id,
          });

          if (!petForm) {
            res.status(404).json({
              success: false,
              message: `No pet form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `pet form ${id} successfully deleted`,
            data: {},
          });
        } else if (type === "giftaid") {
          const giftAidForm = await formModels.FormGiftAidModel.deleteOne({
            _id: id,
          });

          if (!giftAidForm) {
            res.status(404).json({
              success: false,
              message: `No giftAid form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `giftAid form ${id} successfully deleted`,
            data: {},
          });
        } else if (type === "volunteer") {
          const volunteerForm = await formModels.FormVolunteerModel.deleteOne({
            _id: id,
          });

          if (!volunteerForm) {
            res.status(404).json({
              success: false,
              message: `No volunteer form with ID of ${id} exists`,
            });
          }

          res.status(200).json({
            success: true,
            message: `volunteer form ${id} successfully deleted`,
            data: {},
          });
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
