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

  if (mode === "subscription") {
    return paymentStatus === "paid" || status === "complete"
      ? "active"
      : "pending";
  }

  return paymentStatus === "paid" || status === "complete" ? "paid" : "pending";
};
