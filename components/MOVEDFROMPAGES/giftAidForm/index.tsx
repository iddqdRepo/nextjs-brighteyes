import { Formik } from "formik";
import React, { useState } from "react";
import { HeadTag, ShowButtonTextOnSubmit } from "../../common/CommonComponents";
import {
  FormikFormContainer,
  FormPageTitle,
} from "../../IndividualFormLayout/CommonFormComponents";
import {
  AboutYouSection,
  GiftAidSection,
  LegalAgreementSection,
} from "../../IndividualFormLayout/GiftAidFormLayout";
import NavbarComponent from "../../Navbar/NavbarComponent";
import { postGiftAidForm } from "../../../routes/formRoutes";

import { giftAidInitialValues } from "../../../utils/formik/giftAidInitialValues";
import { GiftAidSchema } from "../../../utils/yup/giftAidYupSchema";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");
  return (
    <>
      <HeadTag
        title={"Gift Aid form - Bright Eyes Animal Sanctuary"}
        metaContent={"Gift Aid form for Bright Eyes Animal Sanctuary."}
        linkHref={"/forms/giftAidForm"}
      />
      <NavbarComponent />
      <form className="flex flex-col items-center justify-center ">
        <FormPageTitle title="Gift Aid Form" />
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
          {({ values, handleSubmit }) => (
            <FormikFormContainer>
              <AboutYouSection values={values} />
              <GiftAidSection />
              <LegalAgreementSection />
              <ShowButtonTextOnSubmit
                loading={loading}
                isSuccess={isSuccess}
                buttonText={buttonText}
                submitHandler={handleSubmit}
                animalName={"form"}
              />
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </FormikFormContainer>
          )}
        </Formik>
      </form>
    </>
  );
};

export default Index;
