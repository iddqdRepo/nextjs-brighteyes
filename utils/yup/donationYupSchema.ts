import * as Yup from "yup";
import { MAX_DONATION_AMOUNT, MIN_DONATION_AMOUNT } from "../donationConstants";

export const DonationSchema = Yup.object({
  donationType: Yup.mixed<"one_off" | "monthly">()
    .oneOf(["one_off", "monthly"])
    .required("Choose a donation type"),
  amount: Yup.number()
    .typeError("Enter a donation amount")
    .integer("Use a whole pound amount")
    .min(MIN_DONATION_AMOUNT, `Minimum donation is GBP ${MIN_DONATION_AMOUNT}`)
    .max(MAX_DONATION_AMOUNT, `Maximum donation is GBP ${MAX_DONATION_AMOUNT}`)
    .required("Enter a donation amount"),
  donor: Yup.object({
    fullName: Yup.string().trim().required("Enter your full name"),
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Enter your email"),
    phone: Yup.string().trim().max(30, "Phone number is too long"),
    addressLine1: Yup.string()
      .trim()
      .required("Enter the first line of your address"),
    addressLine2: Yup.string().trim(),
    townCity: Yup.string().trim().required("Enter your town or city"),
    postcode: Yup.string().trim().required("Enter your postcode"),
  }),
  giftAid: Yup.object({
    wantsGiftAid: Yup.boolean().required(),
    giftAidFuture: Yup.boolean().required(),
    giftAidPast: Yup.boolean().required(),
    declarationAccepted: Yup.boolean().when("wantsGiftAid", {
      is: true,
      then: (schema) =>
        schema.oneOf(
          [true],
          "Please confirm the Gift Aid declaration before continuing"
        ),
      otherwise: (schema) => schema,
    }),
  }),
}).test(
  "monthly-gift-aid-future",
  "Monthly gifts with Gift Aid need a continuing declaration",
  function (values) {
    if (
      values?.donationType === "monthly" &&
      values.giftAid.wantsGiftAid &&
      !values.giftAid.giftAidFuture
    ) {
      return this.createError({
        path: "giftAid.giftAidFuture",
        message: "Monthly gifts with Gift Aid need a continuing declaration",
      });
    }

    return true;
  }
);
