import { Formik } from "formik";
import React from "react";
import {
  FormikFormContainer,
  FormPageTitle,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import {
  AboutYouSection,
  GiftAidSection,
  LegalAgreementSection,
} from "../../../components/IndividualFormLayout/GiftAidFormPageLayout";
import { giftAidInitialValues } from "../../../utils/formik/giftAidInitialValues";
import { GiftAidSchema } from "../../../utils/yup/giftAidYupSchema";

const Index = () => {
  return (
    <form className="flex flex-col items-center justify-center ">
      <FormPageTitle title="GiftAid Form" />
      <Formik
        initialValues={giftAidInitialValues}
        validationSchema={GiftAidSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, errors, touched }) => (
          <FormikFormContainer>
            <AboutYouSection
              values={values}
              touched={touched}
              errors={errors}
            />
            <GiftAidSection />
            <LegalAgreementSection />

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </FormikFormContainer>
        )}
      </Formik>
    </form>
  );
};

export default Index;
