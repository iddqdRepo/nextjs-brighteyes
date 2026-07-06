import { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import { ValidationError } from "yup";
import DonationModel from "../../../models/donationModel";
import {
  appendSetCookie,
  createDonationCheckoutCookie,
} from "../../../utils/donationAuth";
import dbConnect from "../../../utils/dbConnect";
import {
  GIFT_AID_DECLARATION_TEXT,
  GIFT_AID_DECLARATION_VERSION,
} from "../../../utils/donationConstants";
import { getBaseUrl, getStripe } from "../../../utils/stripe";
import { DonationSchema } from "../../../utils/yup/donationYupSchema";

const sanitizePayload = (payload: any) => {
  const wantsGiftAid = payload.giftAid.wantsGiftAid;

  return {
    donationType: payload.donationType,
    amount: Number(payload.amount),
    donor: {
      fullName: payload.donor.fullName.trim(),
      email: payload.donor.email.trim(),
      //phone and addressLine2 are optional in the schema, so a direct API
      //call can omit them entirely — the site form always sends "".
      phone: (payload.donor.phone || "").trim(),
      addressLine1: payload.donor.addressLine1.trim(),
      addressLine2: (payload.donor.addressLine2 || "").trim(),
      townCity: payload.donor.townCity.trim(),
      postcode: payload.donor.postcode.trim(),
    },
    giftAid: wantsGiftAid
      ? {
          wantsGiftAid: true,
          giftAidFuture: payload.giftAid.giftAidFuture,
          giftAidPast: payload.giftAid.giftAidPast,
          declarationAccepted: payload.giftAid.declarationAccepted,
          declarationText: GIFT_AID_DECLARATION_TEXT,
          declarationTextVersion: GIFT_AID_DECLARATION_VERSION,
          acceptedAt: new Date(),
        }
      : {
          wantsGiftAid: false,
          giftAidFuture: false,
          giftAidPast: false,
          declarationAccepted: false,
        },
  };
};

const buildLineItem = (donation: any, amountInPence: number): any => {
  const priceData: Record<string, unknown> = {
    currency: "gbp",
    unit_amount: amountInPence,
    product_data: {
      name:
        donation.donationType === "monthly"
          ? "Monthly card donation"
          : "One-off card donation",
      description: donation.giftAid.wantsGiftAid
        ? "Gift Aid declaration captured on the website."
        : "Secure card donation",
    },
  };

  if (donation.donationType === "monthly") {
    priceData.recurring = {
      interval: "month",
    };
  }

  return {
    price_data: priceData,
    quantity: 1,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const validatedPayload = await DonationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    await dbConnect();

    const normalizedPayload = sanitizePayload(validatedPayload);
    const amountInPence = Math.round(normalizedPayload.amount * 100);
    const checkoutNonce = randomBytes(24).toString("hex");
    const stripe = getStripe();
    //Validate deployment configuration before creating a Mongo record or
    //Stripe customer that could never receive a usable Checkout Session.
    const baseUrl = getBaseUrl();

    const donation = await DonationModel.create({
      ...normalizedPayload,
      currency: "gbp",
      status: "pending",
      statusUpdatedAt: new Date(),
    });

    const customer = await stripe.customers.create({
      name: normalizedPayload.donor.fullName,
      email: normalizedPayload.donor.email,
      phone: normalizedPayload.donor.phone || undefined,
      address: {
        line1: normalizedPayload.donor.addressLine1,
        line2: normalizedPayload.donor.addressLine2 || undefined,
        city: normalizedPayload.donor.townCity,
        postal_code: normalizedPayload.donor.postcode,
        country: "GB",
      },
      metadata: {
        donationId: donation.id,
      },
    });

    const metadata = {
      donationId: donation.id,
      donationType: normalizedPayload.donationType,
      giftAid: normalizedPayload.giftAid.wantsGiftAid ? "true" : "false",
      checkoutNonce,
    };

    const checkoutSessionParams: any = {
      mode:
        normalizedPayload.donationType === "monthly"
          ? "subscription"
          : "payment",
      customer: customer.id,
      success_url: `${baseUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
      line_items: [buildLineItem(validatedPayload, amountInPence)],
      metadata,
    };

    if (normalizedPayload.donationType === "one_off") {
      checkoutSessionParams.submit_type = "donate";
      checkoutSessionParams.payment_intent_data = {
        metadata,
      };
    } else {
      checkoutSessionParams.subscription_data = {
        metadata,
      };
    }

    const session = await stripe.checkout.sessions.create(
      checkoutSessionParams
    );

    await DonationModel.findByIdAndUpdate(donation.id, {
      $set: {
        "stripe.customerId": customer.id,
        "stripe.checkoutSessionId": session.id,
        status: "pending",
        statusUpdatedAt: new Date(session.created * 1000),
      },
    });

    appendSetCookie(
      res,
      createDonationCheckoutCookie(donation.id, checkoutNonce)
    );

    return res.status(200).json({
      donationId: donation.id,
      url: session.url,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.errors[0] || "Please check the donation form",
      });
    }

    console.error("Error creating donation checkout session", error);
    return res.status(500).json({
      message:
        "Unable to start the donation checkout. Please verify Stripe is configured.",
    });
  }
}
