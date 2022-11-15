import * as Yup from "yup";

const aboutQuestionsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ContactUsYupSchema = Yup.object().shape({
  aboutQuestions: aboutQuestionsSchema,
  message: Yup.string().min(2, "Too Short!").required("Required"),
});
