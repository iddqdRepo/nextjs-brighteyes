import { describe, expect, it } from "@jest/globals";
import { MAX_DONATION_AMOUNT } from "../../utils/donationConstants";
import { donationInitialValues } from "../../utils/formik/donationInitialValues";
import { DonationSchema } from "../../utils/yup/donationYupSchema";

const validDonation = {
  ...donationInitialValues,
  donor: {
    fullName: "Test Donor",
    email: "donor@example.com",
    phone: "",
    addressLine1: "1 Test Street",
    addressLine2: "",
    townCity: "Enniskillen",
    postcode: "BT00 0AA",
  },
  giftAid: {
    wantsGiftAid: false,
    giftAidFuture: false,
    giftAidPast: false,
    declarationAccepted: false,
  },
};

describe("DonationSchema amount limits", () => {
  it("accepts Stripe's largest supported whole-pound GBP amount", async () => {
    await expect(
      DonationSchema.validate({
        ...validDonation,
        amount: MAX_DONATION_AMOUNT,
      })
    ).resolves.toBeDefined();
  });

  it("rejects an amount Stripe cannot create a Checkout price for", async () => {
    await expect(
      DonationSchema.validate({
        ...validDonation,
        amount: MAX_DONATION_AMOUNT + 1,
      })
    ).rejects.toThrow("Maximum donation");
  });
});
