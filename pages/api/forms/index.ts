import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";
import { getAuthUser } from "../../../utils/auth";
import { notifyFormSubmission } from "../../../utils/notifyFormSubmission";

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
  "Please add a valid query type e.g. api/forms?type=volunteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const model = modelByType(query.type);

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        //Admin only: submitted forms contain applicants' personal data.
        if (!getAuthUser(req)) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        if (!model) {
          return res
            .status(400)
            .json({ success: false, message: INVALID_TYPE_MESSAGE });
        }
        const forms = await model.find();
        return res.status(200).json({ success: true, data: forms });
      }

      case "POST": {
        //Public: visitors submit adoption / gift aid / volunteer / contact forms.
        if (!model) {
          return res
            .status(400)
            .json({ success: false, message: INVALID_TYPE_MESSAGE });
        }
        const form = await model.create(req.body);
        //Only after the form is safely saved; never blocks the submission.
        await notifyFormSubmission(
          String(query.type),
          req.body?.aboutQuestions?.name
        );
        return res.status(201).json({ success: true, data: form });
      }

      default:
        res.setHeader("Allow", "GET, POST");
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("api/forms error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
