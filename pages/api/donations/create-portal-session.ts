import { NextApiRequest, NextApiResponse } from "next";
import DonationModel from "../../../models/donationModel";
import {
  DONATION_ACCESS_COOKIE,
  getCookieValue,
  getDonationAccessCookieName,
  verifyDonationToken,
} from "../../../utils/donationAuth";
import dbConnect from "../../../utils/dbConnect";
import { getBaseUrl, getStripe } from "../../../utils/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { donationId } = req.body as { donationId?: string };

    if (!donationId) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    await dbConnect();
    const stripe = getStripe();
    const accessToken = verifyDonationToken(
      getCookieValue(req, getDonationAccessCookieName(donationId)) ||
        getCookieValue(req, DONATION_ACCESS_COOKIE),
      "access"
    );

    const donation = await DonationModel.findById(donationId);

    if (!donation?.stripe?.customerId || donation.donationType !== "monthly") {
      return res.status(404).json({
        message: "No Stripe customer was found for this donation",
      });
    }

    if (
      !accessToken ||
      accessToken.donationId !== donationId ||
      accessToken.customerId !== donation.stripe.customerId
    ) {
      return res.status(403).json({
        message: "You are not authorised to manage this donation",
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: donation.stripe.customerId,
      return_url: `${getBaseUrl()}/donate/thank-you?donationId=${donationId}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating billing portal session", error);
    return res.status(500).json({
      message: "Unable to open the Stripe billing portal",
    });
  }
}
