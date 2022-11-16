import { Formik } from "formik";
import React, { useState } from "react";
import { ShowButtonTextOnSubmit } from "../../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayoutComponents";
import {
  FormikFormContainer,
  FormPageTitle,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import {
  AboutYouSection,
  GiftAidSection,
  LegalAgreementSection,
} from "../../../components/IndividualFormLayout/GiftAidFormLayout";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { postGiftAidForm } from "../../../routes/formRoutes";

import { giftAidInitialValues } from "../../../utils/formik/giftAidInitialValues";
import { GiftAidSchema } from "../../../utils/yup/giftAidYupSchema";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");
  return (
    <>
      <NavbarComponent />
      <form className="flex flex-col items-center justify-center ">
        <FormPageTitle title="GiftAid Form" />
        <Formik
          initialValues={giftAidInitialValues}
          validationSchema={GiftAidSchema}
          onSubmit={async (data) => {
            if (data.giftAidFuture) {
              data.giftAidFuture = data.giftAidFuture[0];
            }
            if (data.giftAidPast) {
              data.giftAidPast = data.giftAidPast[0];
            }
            console.log("data", data);
            setLoading(true);
            let successful = await postGiftAidForm(data);
            if (successful.success) {
              setLoading(false);
              setIsSuccess(true);
            } else {
              setLoading(false);
              setIsSuccess(false);
              setButtonText("ERROR, try again");
            }
          }}
        >
          {({ values, errors, touched, handleSubmit }) => (
            <FormikFormContainer>
              <AboutYouSection
                values={values}
                touched={touched}
                errors={errors}
              />
              <GiftAidSection />
              <LegalAgreementSection />
              <ShowButtonTextOnSubmit
                loading={loading}
                isSuccess={isSuccess}
                buttonText={buttonText}
                submitHandler={handleSubmit}
                animalName={"form"}
              />
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </FormikFormContainer>
          )}
        </Formik>
      </form>
    </>
  );
};

export default Index;
