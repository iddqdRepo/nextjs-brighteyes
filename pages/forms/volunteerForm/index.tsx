import { Formik } from "formik";
import React, { useState } from "react";
import {
  FormikFormContainer,
  FormPageTitle,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import { FieldSet } from "../../../components/IndividualFormLayout/CommonFormComponents";
import { VolunteerInitialValuesInterface } from "../../../interfaces/volunteerInitialValuesInterface";
import { volunteerFormBuilder } from "../../../utils/formik/volunteerFormBuilder";
import { volunteerInitialValues } from "../../../utils/formik/volunteerInitialValues";
import { VolunteerSchema } from "../../../utils/yup/volunteerYupSchema";

function Index() {
  const [toShow, setToShow] = useState(
    volunteerFormBuilder as VolunteerInitialValuesInterface
  );

  return (
    <form className="flex flex-col items-center justify-center ">
      <FormPageTitle title={` Volunteer Form`} />
      <Formik
        initialValues={volunteerInitialValues}
        validationSchema={VolunteerSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, errors, touched }) => (
          <FormikFormContainer>
            <FieldSet legendText="About you">
              <QuestionsMap
                getUseState={toShow}
                setUseState={setToShow}
                type={"volunteer"}
                category={"aboutQuestions"}
                values={values}
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
                values={values}
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
                values={values}
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
                values={values}
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
                values={values}
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
                  values={values}
                  touch={touched}
                  err={errors}
                />
              </div>
            </FieldSet>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </FormikFormContainer>
        )}
      </Formik>
    </form>
  );
}

export default Index;
