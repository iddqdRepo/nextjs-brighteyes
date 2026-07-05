import type { Stripe as StripeClient } from "stripe";

const StripeConstructor = require("stripe");
const globalForStripe = global as typeof global & {
  stripeClient?: StripeClient;
};

export const getStripe = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  const stripeClient =
    globalForStripe.stripeClient ||
    new StripeConstructor(stripeSecretKey, {
      appInfo: {
        name: "Bright Eyes Donations",
      },
    });

  if (process.env.NODE_ENV !== "production") {
    globalForStripe.stripeClient = stripeClient;
  }

  return stripeClient;
};

export const getBaseUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL or SITE_URL must be set");
  }

  return siteUrl.replace(/\/$/, "");
};
