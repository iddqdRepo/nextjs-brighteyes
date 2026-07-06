import { NextApiRequest, NextApiResponse } from "next";
import DonationModel from "../../../models/donationModel";
import {
  getCheckoutSessionDonationStatus,
  getStripeId,
  mapSubscriptionStatus,
  withStatusTimestampGuard,
} from "../../../utils/donationStatus";
import dbConnect from "../../../utils/dbConnect";
import { getStripe } from "../../../utils/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const buffer = async (readable: NextApiRequest) => {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};

const compactObject = (object: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
};

const getMetadataDonationId = (metadata?: Record<string, string>) => {
  return metadata?.donationId;
};

const getInvoiceMetadata = (invoice: any) => {
  return (
    invoice.parent?.subscription_details?.metadata ||
    invoice.subscription_details?.metadata ||
    invoice.lines?.data?.find((line: any) => line.metadata?.donationId)
      ?.metadata ||
    invoice.metadata ||
    {}
  );
};

const getDonationLookup = ({
  donationId,
  checkoutSessionId,
  subscriptionId,
  paymentIntentId,
  customerId,
}: {
  donationId?: string;
  checkoutSessionId?: string;
  subscriptionId?: string;
  paymentIntentId?: string;
  customerId?: string;
}) => {
  if (donationId) {
    return { _id: donationId };
  }

  if (subscriptionId) {
    return { "stripe.subscriptionId": subscriptionId };
  }

  if (checkoutSessionId) {
    return { "stripe.checkoutSessionId": checkoutSessionId };
  }

  if (paymentIntentId) {
    return { "stripe.paymentIntentId": paymentIntentId };
  }

  if (customerId) {
    return { "stripe.customerId": customerId };
  }

  return null;
};

const updateDonationFromStripe = async (
  lookup: ReturnType<typeof getDonationLookup>,
  update: Record<string, unknown>
) => {
  if (!lookup) {
    return;
  }

  const statusUpdatedAt = update.statusUpdatedAt;
  const guardedLookup = withStatusTimestampGuard(lookup, statusUpdatedAt);

  //Stripe can retry an old event after a newer cancellation or payment
  //failure. The timestamp guard prevents stale delivery from rolling status
  //and references backwards.
  await DonationModel.findOneAndUpdate(guardedLookup, {
    $set: compactObject(update),
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!webhookSecret) {
    return res
      .status(500)
      .json({ message: "STRIPE_WEBHOOK_SECRET is not set" });
  }

  try {
    const signatureHeader = req.headers["stripe-signature"];

    if (!signatureHeader) {
      return res.status(400).json({ message: "Missing Stripe signature" });
    }

    const stripe = getStripe();
    const rawBody = await buffer(req);
    const signature = Array.isArray(signatureHeader)
      ? signatureHeader[0]
      : signatureHeader;
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
    //Use Stripe's stable event time rather than webhook processing time.
    //Retries must not move paidAt into a later day or month.
    const eventDate = new Date(event.created * 1000);

    await dbConnect();

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as any;
        const donationId = getMetadataDonationId(session.metadata);
        const status = getCheckoutSessionDonationStatus(session);
        const customerId = getStripeId(session.customer);
        const paymentIntentId = getStripeId(session.payment_intent);
        const subscriptionId = getStripeId(session.subscription);

        await updateDonationFromStripe(
          getDonationLookup({
            donationId,
            checkoutSessionId: session.id,
            paymentIntentId,
            subscriptionId,
            customerId,
          }),
          {
            status,
            statusUpdatedAt: eventDate,
            paidAt:
              status === "paid" || status === "active" ? eventDate : undefined,
            "stripe.checkoutSessionId": session.id,
            "stripe.customerId": customerId,
            "stripe.paymentIntentId": paymentIntentId,
            "stripe.subscriptionId": subscriptionId,
          }
        );
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as any;

        await updateDonationFromStripe(
          getDonationLookup({
            donationId: getMetadataDonationId(session.metadata),
            checkoutSessionId: session.id,
            customerId: getStripeId(session.customer),
          }),
          {
            status: "cancelled",
            statusUpdatedAt: eventDate,
            "stripe.checkoutSessionId": session.id,
            "stripe.customerId": getStripeId(session.customer),
          }
        );
        break;
      }
      case "invoice.paid":
      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const metadata = getInvoiceMetadata(invoice);
        const subscriptionId = getStripeId(invoice.subscription);
        const customerId = getStripeId(invoice.customer);
        const paymentIntentId = getStripeId(invoice.payment_intent);
        const isSuccessfulInvoice =
          event.type === "invoice.paid" ||
          event.type === "invoice.payment_succeeded";
        const invoicePaidAt = invoice.status_transitions?.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000)
          : eventDate;

        await updateDonationFromStripe(
          getDonationLookup({
            donationId: getMetadataDonationId(metadata),
            subscriptionId,
            paymentIntentId,
            customerId,
          }),
          {
            status: isSuccessfulInvoice ? "active" : "failed",
            statusUpdatedAt: eventDate,
            paidAt: isSuccessfulInvoice ? invoicePaidAt : undefined,
            "stripe.subscriptionId": subscriptionId,
            "stripe.customerId": customerId,
            "stripe.paymentIntentId": paymentIntentId,
            "stripe.latestInvoiceId": invoice.id,
          }
        );
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const donationId = getMetadataDonationId(subscription.metadata);
        const customerId = getStripeId(subscription.customer);

        await updateDonationFromStripe(
          getDonationLookup({
            donationId,
            subscriptionId: subscription.id,
            customerId,
          }),
          {
            status:
              event.type === "customer.subscription.deleted"
                ? "cancelled"
                : mapSubscriptionStatus(subscription.status),
            statusUpdatedAt: eventDate,
            "stripe.subscriptionId": subscription.id,
            "stripe.customerId": customerId,
          }
        );
        break;
      }
      default:
        break;
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return res.status(400).json({ message: "Webhook error" });
  }
}
