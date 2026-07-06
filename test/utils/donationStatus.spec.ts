import { describe, expect, it } from "@jest/globals";
import {
  getCheckoutSessionDonationStatus,
  withStatusTimestampGuard,
} from "../../utils/donationStatus";

describe("getCheckoutSessionDonationStatus", () => {
  it("does not call a completed but unpaid one-off Checkout Session paid", () => {
    expect(
      getCheckoutSessionDonationStatus({
        mode: "payment",
        status: "complete",
        payment_status: "unpaid",
      })
    ).toBe("pending");
  });

  it("does not activate a completed but unpaid subscription", () => {
    expect(
      getCheckoutSessionDonationStatus({
        mode: "subscription",
        status: "complete",
        payment_status: "unpaid",
      })
    ).toBe("pending");
  });

  it("maps paid and expired sessions to terminal states", () => {
    expect(
      getCheckoutSessionDonationStatus({
        mode: "payment",
        status: "complete",
        payment_status: "paid",
      })
    ).toBe("paid");
    expect(
      getCheckoutSessionDonationStatus({
        mode: "payment",
        status: "expired",
        payment_status: "unpaid",
      })
    ).toBe("cancelled");
  });
});

describe("withStatusTimestampGuard", () => {
  it("only allows a Stripe event to replace an older status", () => {
    const eventTime = new Date("2026-07-06T12:00:00.000Z");

    expect(withStatusTimestampGuard({ _id: "donation-1" }, eventTime)).toEqual({
      _id: "donation-1",
      $or: [
        { statusUpdatedAt: { $exists: false } },
        { statusUpdatedAt: { $lte: eventTime } },
      ],
    });
  });
});
