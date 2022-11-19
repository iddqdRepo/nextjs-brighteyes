import * as Yup from "yup";
export const AnimalSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .matches(/^\S*$/g, "* This field cannot contain spaces"),
  type: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  age: Yup.number().required("Required").typeError("Must be a number"),
  breed: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  yearsOrMonths: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  sex: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  size: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  suitableForAnimals: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  suitableForChildren: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  adopted: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  desc: Yup.string().min(2, "Too Short!").required("Required"),
});
