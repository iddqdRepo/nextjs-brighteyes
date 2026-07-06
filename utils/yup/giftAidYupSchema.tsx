import * as Yup from "yup";

const aboutQuestionsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  postcode: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobile: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const GiftAidSchema = Yup.object()
  .shape({
    aboutQuestions: aboutQuestionsSchema,
    giftAidFuture: Yup.mixed(),
    giftAidPast: Yup.mixed(),
    declarationAccepted: Yup.boolean().oneOf(
      [true],
      "Please confirm the Gift Aid declaration"
    ),
  })
  .test(
    "gift-aid-period",
    "Choose at least one set of donations",
    function (values) {
      const selected = (value: unknown) =>
        value === "Yes" || (Array.isArray(value) && value.includes("Yes"));

      if (!selected(values?.giftAidFuture) && !selected(values?.giftAidPast)) {
        return this.createError({
          path: "giftAidFuture",
          message: "Choose at least one set of donations",
        });
      }

      return true;
    }
  );
