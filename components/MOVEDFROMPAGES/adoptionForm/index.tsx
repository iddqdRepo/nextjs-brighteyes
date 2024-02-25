import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  FieldSet,
  FormikFormContainer,
  FormPageTitle,
  QuestionsMap,
} from "../../IndividualFormLayout/CommonFormComponents";
import {
  CatAdoptionSchema,
  DogAdoptionSchema,
} from "../../../utils/yup/adoptionYupSchema";
import { adoptionFormBuilder } from "../../../utils/formik/adoptionFormBuilder";
import { AdoptionInitialValuesInterface } from "../../../interfaces/adoptionInitialValuesInterface";
import { CheckboxPlanningFormik } from "../../IndividualFormLayout/AdoptionFormLayoutComponents";
import { LegalAgreementSection } from "../../IndividualFormLayout/AdoptionFormLayout";
import { newAdoptionInitialValues } from "../../../utils/formik/newAdoptionInitialValues";
import NavbarComponent from "../../Navbar/NavbarComponent";
import { postPetForm } from "../../../routes/formRoutes";
import { HeadTag, ShowButtonTextOnSubmit } from "../../common/CommonComponents";
import {
  flattenNestedAdoptionObjectForFormBuilder,
  revertDataObjectsBackToOriginalFormat,
} from "../../../utils/FormFlattenAndRevert";

function Index({ type }: { type: string }) {
  const [toShow, setToShow] = useState({} as AdoptionInitialValuesInterface);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");

  useEffect(() => {
    newAdoptionInitialValues.type = type;
    let tempObj: any = {};
    for (const [key, value] of Object.entries(adoptionFormBuilder)) {
      tempObj[key] = flattenNestedAdoptionObjectForFormBuilder(value);
    }
    setToShow({ ...tempObj });
  }, []);

  return (
    <>
      <HeadTag
        title={"Animal Application Form"}
        metaContent={
          "Apply to re-home a dog or cat from Bright Eyes Animal Santuary, Fermanagh."
        }
        linkHref={"/forms/adoptionForm?type=dog"}
      />
      <NavbarComponent />
      <form className="flex flex-col items-center justify-center ">
        <FormPageTitle title={` Adopt a ${type} Form`} />
        <Formik
          initialValues={newAdoptionInitialValues}
          validationSchema={
            type === "Dog" ? DogAdoptionSchema : CatAdoptionSchema
          }
          onSubmit={async (data) => {
            const checkBox = data.homeQuestions;
            setLoading(true);
            if (checkBox["planning>baby"]) {
              checkBox["planning>baby"] = checkBox["planning>baby"][0];
            }
            if (checkBox["planning>moving"]) {
              checkBox["planning>moving"] = checkBox["planning>moving"][0];
            }
            if (checkBox["planning>workHoursChange"]) {
              checkBox["planning>workHoursChange"] =
                checkBox["planning>workHoursChange"][0];
            }
            if (checkBox["planning>holiday"]) {
              checkBox["planning>holiday"] = checkBox["planning>holiday"][0];
            }

            let newData = await revertDataObjectsBackToOriginalFormat(
              data,
              type
            );
            let successful = await postPetForm(newData);
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
          {({ handleSubmit }) => (
            <FormikFormContainer>
              <FieldSet id="About-you" legendText="About you">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  typeOfForm={"adoption"}
                  category={"aboutQuestions"}
                />
              </FieldSet>
              <FieldSet
                id={type + "-matching-questions"}
                legendText={type + " Matching Questions"}
              >
                {type === "Dog" ? (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"dogMatchingQuestions"}
                  />
                ) : (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"catMatchingQuestions"}
                  />
                )}
              </FieldSet>
              <FieldSet id="Home-Questions" legendText="Home Questions">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  typeOfForm={"adoption"}
                  category={"homeQuestions"}
                />
                {toShow!.homeQuestions ? (
                  <CheckboxPlanningFormik stateField={toShow} />
                ) : (
                  <></>
                )}
              </FieldSet>
              <FieldSet
                id={type + "-questions"}
                legendText={type + " Questions"}
              >
                {type === "Dog" ? (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"dogQuestions"}
                  />
                ) : (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"catQuestions"}
                  />
                )}
              </FieldSet>
              <LegalAgreementSection type={type} />
              <FieldSet
                id="Hear-About-Us"
                legendText={"How did you hear about us?"}
              >
                <div className="flex ">
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"hearAboutUsInfo"}
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

export async function getServerSideProps(context: { query: { type: any } }) {
  // get the query from the url to decide whether to show Dog or Cat form
  return {
    props: {
      type: context.query.type,
    },
  };
}
