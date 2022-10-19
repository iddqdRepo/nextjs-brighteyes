import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  FieldSet,
  FormikFormContainer,
  FormPageTitle,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import { AdoptionSchema } from "../../../utils/yup/adoptionYupSchema";
import { adoptionFormBuilder } from "../../../utils/formik/adoptionFormBuilder";
import { AdoptionFormBuilderInterface } from "../../../interfaces/adoptionFormBuilderInterface";
import { AdoptionInitialValuesInterface } from "../../../interfaces/adoptionInitialValuesInterface";
import { CheckboxPlanningFormik } from "../../../components/IndividualFormLayout/AdoptionFormLayoutComponents";
import { LegalAgreementSection } from "../../../components/IndividualFormLayout/AdoptionFormLayout";
// import { adoptionInitialValues } from "../../../utils/formik/adoptionInitialValues";

function Index({ type }: { type: string }) {
  const adoptionInitialValues = {
    type: "Adoption",
    aboutQuestions: {
      title: "",
      name: "",
      address: "",
      postcode: "",
      phone: "",
      mobile: "",
      email: "",
    },
    dogMatchingQuestions: {
      dogName: "",
      dogSize: "",
      dogType: "",
      dogAge: "",
      dogSex: "",
    },
    catMatchingQuestions: {
      catName: "",
      catAge: "",
      catType: "",
      catColour: "",
      catSex: "",
      catAllergy: "",
    },
    homeQuestions: {
      homeType: "",
      rentOrOwn: "",
      townOrCountry: "",
      nextToRoad: "",
      gardenOrYard: "",
      "gardenOrYardInfo>gardenOrYardSize": "",
      "gardenOrYardInfo>fullyEnclosed": "",
      "gardenOrYardInfo>fenceHeight": "",
      numAdults: "",
      numChildren: "",
      childrenAges: "",
      "otherChildrenVisitInfo>otherChildrenVisit": "",
      "otherChildrenVisitInfo>otherChildrenAges": "",
      "otherChildrenVisitInfo>otherChildrenVisitFrequency": "",
      retired: "",
      "planning>baby": "",
      "planning>moving": "",
      "planning>workHoursChange": "",
      "planning>holiday": "",
    },
    dogQuestions: {
      dogReason: "",
      "dogHomeAloneInfo>dogHomeAlone": "",
      "dogHomeAloneInfo>dogHomeAloneHours": "",
      "dogHomeAloneInfo>dogHomeAloneFrequency": "",
      exerciseType: "",
      exerciseTime: "",
      dogSleepLocation: "",
      "ownOtherDogsCurrentInfo>ownOtherCurrentDogs": "",
      "ownOtherDogsCurrentInfo>otherCurrentDogBreed": "",
      "ownOtherDogsCurrentInfo>otherCurrentDogNeutered": "",
      "ownOtherDogsCurrentInfo>otherCurrentDogTime": "",
      "dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets": "",
      "dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes": "",
      "ownOtherDogsPastInfo>ownOtherPastDogs": "",
      "ownOtherDogsPastInfo>otherPastDogTime": "",
      "ownOtherDogsPastInfo>otherDogFate": "",
      dogAwareOfCostsAndLegal: "",
      dogHowSoon: "",
      dogFurtherInfo: "",
    },
    catQuestions: {
      catReason: "",
      "catHomeAloneInfo>catHomeAlone": "",
      "catHomeAloneInfo>catHomeAloneHours": "",
      "catHomeAloneInfo>catHomeAloneFrequency": "",
      catSleepLocation: "",
      "ownOtherCatsCurrentInfo>ownOtherCurrentCats": "",
      "ownOtherPetsCurrentInfo>ownOtherCurrentPets": "",
      "ownOtherPetsCurrentInfo>otherCurrentPetTypes": "",
      "ownOtherCatsPastInfo>ownOtherPastCats": "",
      "ownOtherCatsPastInfo>otherPastCatTime": "",
      "ownOtherCatsPastInfo>otherCatFate": "",
      catAwareOfCostsAndLegal: "",
      catHowSoon: "",
      catFurtherInfo: "",
    },

    hearAboutUsInfo: {
      hearAboutUs: "",
      other: "",
    },
  };
  const [toShow, setToShow] = useState({} as AdoptionInitialValuesInterface);

  interface tempObjInterface {
    [key: string]: string;
  }
  useEffect(() => {
    /*
    ^ FormBuilder needs flattened, legacy (how the db was set up with nested objects)
    ^ Flattened with the following recursive function instead of manually to keep the object path
    * e.g."gardenOrYardInfo>gardenOrYardSize" so it can be stored in the correct place in the db
   */
    let tempObj: any = {};
    const flattenObj = (objToFlatten: keyof AdoptionFormBuilderInterface) => {
      let result = {} as tempObjInterface;

      for (const [i, v] of Object.entries(objToFlatten)) {
        if (typeof v === "object" && !Array.isArray(v)) {
          const tempFlatten = flattenObj(v);

          for (const [j, jValue] of Object.entries(tempFlatten)) {
            /*
             * result needs to be joined with ">" because formik splits on "."
             * which makes flattening pointless as it's rebuilt in initialValues
             * when passed into <Field name={}/> making initialValues not Match toShow
             * this causes bugs on expose() etc
             */

            result[i + ">" + j] = jValue;
          }
        } else {
          result[i] = v[0];
        }
      }
      return result;
    };

    for (const [key, value] of Object.entries(adoptionFormBuilder)) {
      tempObj[key] = flattenObj(value);
    }

    setToShow({ ...tempObj });
  }, []);

  return (
    <form className="flex flex-col items-center justify-center ">
      <FormPageTitle title={` Adopt a ${type} Form`} />
      <Formik
        initialValues={adoptionInitialValues}
        validationSchema={AdoptionSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, errors, touched }) => (
          <FormikFormContainer>
            <FieldSet legendText="About you">
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
            <FieldSet legendText={type + " Matching Questions"}>
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
            <FieldSet legendText="Home Questions">
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
            <FieldSet legendText={type + " Questions"}>
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
            <FieldSet legendText={"How Did you hear about us?"}>
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
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </FormikFormContainer>
        )}
      </Formik>
    </form>
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
