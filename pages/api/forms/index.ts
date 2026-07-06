import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import formModels from "../../../models/formModels";
import dbConnect from "../../../utils/dbConnect";
import { FORBIDDEN_MESSAGE, getAdminUser } from "../../../utils/auth";
import {
  GIFT_AID_DECLARATION_VERSION,
  MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT,
} from "../../../utils/donationConstants";
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const canonicalFormType = (
  apiType: unknown,
  body: Record<string, unknown>
): string | null => {
  switch (apiType) {
    case "pet":
      return body.type === "Dog" || body.type === "Cat" ? body.type : null;
    case "giftaid":
      return "giftAid";
    case "volunteer":
      return "volunteer";
    case "contactus":
      return "contactUs";
    default:
      return null;
  }
};

//Public callers can bypass Formik entirely, so enforce the common fields that
//the admin UI relies on before a malformed record reaches the database.
const normalizePublicSubmission = (
  apiType: unknown,
  rawBody: unknown
): Record<string, unknown> | null => {
  if (!isRecord(rawBody) || !isRecord(rawBody.aboutQuestions)) {
    return null;
  }

  const aboutQuestions = rawBody.aboutQuestions;
  const name =
    typeof aboutQuestions.name === "string" ? aboutQuestions.name.trim() : "";
  const type = canonicalFormType(apiType, rawBody);
  if (!type || name.length < 2 || name.length > 100) {
    return null;
  }

  const normalizedAbout = { ...aboutQuestions, name };
  const normalized: Record<string, unknown> = {
    ...rawBody,
    type,
    aboutQuestions: normalizedAbout,
  };

  if (apiType === "contactus") {
    const email =
      typeof aboutQuestions.email === "string"
        ? aboutQuestions.email.trim()
        : "";
    const message =
      typeof rawBody.message === "string" ? rawBody.message.trim() : "";
    if (
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 2 ||
      message.length > 5000
    ) {
      return null;
    }
    normalized.aboutQuestions = { ...normalizedAbout, email };
    normalized.message = message;
  }

  if (apiType === "giftaid") {
    const address =
      typeof aboutQuestions.address === "string"
        ? aboutQuestions.address.trim()
        : "";
    const postcode =
      typeof aboutQuestions.postcode === "string"
        ? aboutQuestions.postcode.trim()
        : "";
    const giftAidFuture = rawBody.giftAidFuture === "Yes" ? "Yes" : "";
    const giftAidPast = rawBody.giftAidPast === "Yes" ? "Yes" : "";

    if (
      address.length < 2 ||
      address.length > 500 ||
      postcode.length < 2 ||
      postcode.length > 20 ||
      (!giftAidFuture && !giftAidPast) ||
      rawBody.declarationAccepted !== true
    ) {
      return null;
    }

    normalized.aboutQuestions = {
      ...normalizedAbout,
      address,
      postcode,
    };
    normalized.giftAidFuture = giftAidFuture;
    normalized.giftAidPast = giftAidPast;
    normalized.declarationAccepted = true;
    normalized.declarationText = MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT;
    normalized.declarationTextVersion = GIFT_AID_DECLARATION_VERSION;
  }

  return normalized;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const model = modelByType(query.type);

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        //Submitted forms contain applicants' personal data, so reading them
        //needs the forms permission (not just any admin account).
        const user = await getAdminUser(req);
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        if (!user.permissions.forms) {
          return res
            .status(403)
            .json({ success: false, message: FORBIDDEN_MESSAGE });
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
        const submission = normalizePublicSubmission(query.type, req.body);
        if (!submission) {
          return res.status(400).json({
            success: false,
            message: "Please check the form and try again",
          });
        }
        const submittedAt = new Date();
        const giftAidEvidence =
          query.type === "giftaid"
            ? {
                declarationAccepted: true,
                declarationText: MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT,
                declarationTextVersion: GIFT_AID_DECLARATION_VERSION,
                acceptedAt: submittedAt,
              }
            : {};
        //Every new submission starts explicitly tracked; forms without these
        //fields predate the tracking feature and are shown as "Pre-update".
        //Overriding here also stops a visitor injecting tracking fields,
        //spoofing the submitted date, or hiding a submission by posting it
        //pre-archived.
        const form = await model.create({
          ...submission,
          _id: undefined,
          __v: undefined,
          //These schemas use `date` as a legacy submission timestamp. Leaving
          //it undefined applies the schema default and rejects a forged date.
          date: undefined,
          status: "new",
          read: false,
          notes: [],
          handledBy: undefined,
          handledAt: undefined,
          archive: "No",
          updatedAt: submittedAt,
          ...giftAidEvidence,
        });
        //Only after the form is safely saved; never blocks the submission.
        await notifyFormSubmission(
          String(query.type),
          (submission.aboutQuestions as { name: string }).name
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
