import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  FieldSet,
  FormikFormContainer,
  FormPageTitle,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import {
  CatAdoptionSchema,
  DogAdoptionSchema,
} from "../../../utils/yup/adoptionYupSchema";
import { adoptionFormBuilder } from "../../../utils/formik/adoptionFormBuilder";
import { AdoptionFormBuilderInterface } from "../../../interfaces/adoptionFormBuilderInterface";
import { AdoptionInitialValuesInterface } from "../../../interfaces/adoptionInitialValuesInterface";
import { CheckboxPlanningFormik } from "../../../components/IndividualFormLayout/AdoptionFormLayoutComponents";
import { LegalAgreementSection } from "../../../components/IndividualFormLayout/AdoptionFormLayout";
import { newAdoptionInitialValues } from "../../../utils/formik/newAdoptionInitialValues";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { postPetForm } from "../../../routes/formRoutes";
import {
  HeadTag,
  ShowButtonTextOnSubmit,
} from "../../../components/common/CommonComponents";

function Index({ type }: { type: string }) {
  const [toShow, setToShow] = useState({} as AdoptionInitialValuesInterface);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");

  interface tempObjInterface {
    [key: string]: string;
  }
  useEffect(() => {
    newAdoptionInitialValues.type = type;

    let tempObj: any = {};
    const flattenNestedAdoptionObjectForFormBuilder = (
      objToFlatten: keyof AdoptionFormBuilderInterface
    ) => {
      //^ Flattening formBuilder because it's easier to flatten > build forms and receive input > explode than
      //^ handle all the multi nesting currently present in the legacy layout for the db
      let result = {} as tempObjInterface;

      for (const [key, value] of Object.entries(objToFlatten)) {
        if (typeof value === "object" && !Array.isArray(value)) {
          //if value is an object, recurse before looping an storing in result
          const tempFlatten = flattenNestedAdoptionObjectForFormBuilder(value);

          for (const [keyToCombine, valueToCombine] of Object.entries(
            tempFlatten
          )) {
            /*
             * result needs to be joined with ">" because formik splits on "."
             * which makes flattening pointless as it's rebuilt in initialValues
             * when passed into <Field name={}/> making initialValues not Match toShow
             * this causes bugs on expose() etc
             */

            result[key + ">" + keyToCombine] = valueToCombine;
          }
        } else {
          result[key] = value[0];
        }
      }
      return result;
    };

    for (const [key, value] of Object.entries(adoptionFormBuilder)) {
      tempObj[key] = flattenNestedAdoptionObjectForFormBuilder(value);
    }
    setToShow({ ...tempObj });
  }, []);

  const revertDataObjectsBackToOriginalFormat = (
    dataToRevert: any,
    type: string
  ) => {
    let explodedObject: any = {};
    for (const [key, value] of Object.entries(dataToRevert)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const [jkey, jvalue] of Object.entries(value as any)) {
          if (jkey.includes(">")) {
            let keyToSplit = jkey.split(">");
            let expandedMainKey = keyToSplit[0];
            let expandedInnerKey = keyToSplit[1];
            let expandedInnerValue = jvalue;
            explodedObject[key][expandedMainKey] = {
              ...explodedObject[key][expandedMainKey],
              [expandedInnerKey]: expandedInnerValue,
            };
          } else {
            explodedObject[key] = { ...explodedObject[key], [jkey]: jvalue };
          }
        }
      }
    }

    return { ...explodedObject, type, archive: "No" };
  };

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
            setLoading(true);
            if (data.homeQuestions["planning>baby"]) {
              data.homeQuestions["planning>baby"] =
                data.homeQuestions["planning>baby"][0];
            }
            if (data.homeQuestions["planning>moving"]) {
              data.homeQuestions["planning>moving"] =
                data.homeQuestions["planning>moving"][0];
            }
            if (data.homeQuestions["planning>workHoursChange"]) {
              data.homeQuestions["planning>workHoursChange"] =
                data.homeQuestions["planning>workHoursChange"][0];
            }
            if (data.homeQuestions["planning>holiday"]) {
              data.homeQuestions["planning>holiday"] =
                data.homeQuestions["planning>holiday"][0];
            }

            //TODO HERE, rchive bit back in after reverting
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
          {({ values, errors, touched, handleSubmit }) => (
            <FormikFormContainer>
              <FieldSet id="About-you" legendText="About you">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"adoption"}
                  category={"aboutQuestions"}
                  values={values}
                  touch={touched}
                  err={errors}
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
                    type={"adoption"}
                    category={"dogMatchingQuestions"}
                    values={values}
                    touch={touched}
                    err={errors}
                  />
                ) : (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    type={"adoption"}
                    category={"catMatchingQuestions"}
                    values={values}
                    touch={touched}
                    err={errors}
                  />
                )}
              </FieldSet>
              <FieldSet id="Home-Questions" legendText="Home Questions">
                <QuestionsMap
                  getUseState={toShow}
                  setUseState={setToShow}
                  type={"adoption"}
                  category={"homeQuestions"}
                  values={values}
                  err={errors}
                  touch={touched}
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
                    type={"adoption"}
                    category={"dogQuestions"}
                    values={values}
                    err={errors}
                    touch={touched}
                  />
                ) : (
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    type={"adoption"}
                    category={"catQuestions"}
                    values={values}
                    err={errors}
                    touch={touched}
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
                    type={"adoption"}
                    category={"hearAboutUsInfo"}
                    values={values}
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

export async function getServerSideProps(context: { query: { type: any } }) {
  // console.log("context =", context.query.type);

  return {
    props: {
      type: context.query.type,
    },
  };
}
