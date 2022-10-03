import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Index = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            className="border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-9 p-2.5 mb-4"
            name="firstName"
          />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <Field
            className="border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-9 p-2.5 mb-4"
            name="lastName"
          />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <Field
            className="border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-9 p-2.5 mb-4"
            name="email"
            type="email"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Index;
