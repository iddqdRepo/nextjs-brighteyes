import { Formik } from "formik";
import React, { useState } from "react";
import {
  HeadTag,
  ShowButtonTextOnSubmit,
} from "../../../components/common/CommonComponents";
import {
  FormikFormContainer,
  FormPageTitle,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import { FieldSet } from "../../../components/IndividualFormLayout/CommonFormComponents";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { VolunteerFormInterface } from "../../../interfaces/volunteerFormInterface";
import { postVolunteerForm } from "../../../routes/formRoutes";
import { volunteerFormBuilder } from "../../../utils/formik/volunteerFormBuilder";
import { volunteerInitialValues } from "../../../utils/formik/volunteerInitialValues";
import { VolunteerSchema } from "../../../utils/yup/volunteerYupSchema";

function Index() {
  const [toShow, setToShow] = useState(
    volunteerFormBuilder as VolunteerFormInterface
  );
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");
  return (
    <>
      <HeadTag
        title={"Volunteer form - Bright Eyes Animal Sanctuary"}
        metaContent={"Volunteer form for Bright Eyes Animal Sanctuary."}
        linkHref={"/forms/volunteerForm"}
      />
      <NavbarComponent />
      <form className="flex flex-col items-center justify-center ">
        <FormPageTitle title={` Volunteer Form`} />
        <Formik
          initialValues={volunteerInitialValues}
          validationSchema={VolunteerSchema}
          onSubmit={async (data) => {
            setLoading(true);
            let successful = await postVolunteerForm(data);
            if (successful) {
              setLoading(false);
              setIsSuccess(true);
            } else {
              setLoading(false);
              setIsSuccess(false);
              setButtonText("ERROR, try again");
            }
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <FormikFormContainer>
              <FieldSet legendText="About you">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"volunteer"}
                  category={"aboutQuestions"}
                  touch={touched}
                  err={errors}
                />
              </FieldSet>
              <FieldSet legendText={"Emergency Contact Infomation"}>
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"volunteer"}
                  category={"emergencyContactInfo"}
                  touch={touched}
                  err={errors}
                />
              </FieldSet>
              <FieldSet legendText="Health Questions">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"volunteer"}
                  category={"healthInfo"}
                  err={errors}
                  touch={touched}
                />
              </FieldSet>
              <FieldSet legendText={"Volunteering Questions"}>
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"volunteer"}
                  category={"volunteeringInfo"}
                  err={errors}
                  touch={touched}
                />
              </FieldSet>
              {/* <LegalAgreementSection type={type} /> */}
              <FieldSet legendText={"Referee Information"}>
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"volunteer"}
                  category={"refereeInfo"}
                  touch={touched}
                  err={errors}
                />
              </FieldSet>
              <FieldSet legendText={"Rehabilitation of Offenders Act 1974"}>
                <div className="flex ">
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    type={"volunteer"}
                    category={"offenderInfo"}
                    touch={touched}
                    err={errors}
                  />
                </div>
              </FieldSet>
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
}

export default Index;
