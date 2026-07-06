import { DonationStatus } from "../interfaces/donation";

type StripeReference = string | { id?: string | null } | null | undefined;

export const getStripeId = (value: StripeReference) => {
  if (!value) {
    return undefined;
  }

  return typeof value === "string" ? value : value.id || undefined;
};

export const mapSubscriptionStatus = (
  status?: string | null
): DonationStatus => {
  switch (status) {
    case "active":
    case "trialing":
      return "active";
    case "canceled":
    case "incomplete_expired":
      return "cancelled";
    case "past_due":
    case "unpaid":
    case "incomplete":
      return "failed";
    default:
      return "pending";
  }
};

export const getCheckoutSessionDonationStatus = ({
  mode,
  payment_status: paymentStatus,
  status,
}: {
  mode?: string | null;
  payment_status?: string | null;
  status?: string | null;
}): DonationStatus => {
  if (status === "expired") {
    return "cancelled";
  }

  //A Checkout Session can be complete while a delayed payment method is
  //still unpaid. Only Stripe's payment_status proves that money was paid (or
  //that no payment was required); async success webhooks will promote it later.
  const paymentComplete =
    paymentStatus === "paid" || paymentStatus === "no_payment_required";

  if (mode === "subscription") {
    return paymentComplete ? "active" : "pending";
  }

  return paymentComplete ? "paid" : "pending";
};

export const withStatusTimestampGuard = (
  lookup: Record<string, unknown>,
  statusUpdatedAt: unknown
) => {
  if (!(statusUpdatedAt instanceof Date)) {
    return lookup;
  }

  return {
    ...lookup,
    $or: [
      { statusUpdatedAt: { $exists: false } },
      { statusUpdatedAt: { $lte: statusUpdatedAt } },
    ],
  };
};
