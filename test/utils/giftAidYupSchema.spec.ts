import { describe, expect, it } from "@jest/globals";
import { GiftAidSchema } from "../../utils/yup/giftAidYupSchema";

const validValues = {
  giftAidFuture: ["Yes"],
  giftAidPast: [],
  declarationAccepted: true,
  aboutQuestions: {
    name: "Taxpayer",
    address: "1 High Street",
    postcode: "BT1 1AA",
    phone: "0123456789",
    mobile: "07123456789",
  },
};

describe("Gift Aid declaration validation", () => {
  it("accepts a confirmed declaration covering at least one period", async () => {
    await expect(GiftAidSchema.validate(validValues)).resolves.toEqual(
      validValues
    );
  });

  it("requires the donor to choose covered donations", async () => {
    await expect(
      GiftAidSchema.validate({
        ...validValues,
        giftAidFuture: [],
      })
    ).rejects.toThrow("Choose at least one set of donations");
  });

  it("requires affirmative acceptance of the taxpayer declaration", async () => {
    await expect(
      GiftAidSchema.validate({
        ...validValues,
        declarationAccepted: false,
      })
    ).rejects.toThrow("Please confirm the Gift Aid declaration");
  });
});
