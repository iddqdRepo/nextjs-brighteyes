import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  FieldSet,
  FormikFormContainer,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import {
  CatAdoptionSchema,
  DogAdoptionSchema,
} from "../../../utils/yup/adoptionYupSchema";
import { adoptionFormBuilder } from "../../../utils/formik/adoptionFormBuilder";
import { AdoptionInitialValuesInterface } from "../../../interfaces/adoptionInitialValuesInterface";
import { CheckboxPlanningFormik } from "../../../components/IndividualFormLayout/AdoptionFormLayoutComponents";
import {
  AdoptionCriteriaCard,
  AdoptionProcessCard,
  LegalAgreementSection,
  NeedHelpCard,
} from "../../../components/IndividualFormLayout/AdoptionFormLayout";
import { newAdoptionInitialValues } from "../../../utils/formik/newAdoptionInitialValues";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { postPetForm } from "../../../routes/formRoutes";
import {
  FooterSection,
  HeadTag,
  SectionEyebrow,
  ShowButtonTextOnSubmit,
} from "../../../components/common/CommonComponents";
import {
  flattenNestedAdoptionObjectForFormBuilder,
  revertDataObjectsBackToOriginalFormat,
} from "../../../utils/FormFlattenAndRevert";

function Index({ type }: { type: string }) {
  const [toShow, setToShow] = useState({} as AdoptionInitialValuesInterface);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Application");

  useEffect(() => {
    newAdoptionInitialValues.type = type;
    let tempObj: any = {};
    for (const [key, value] of Object.entries(adoptionFormBuilder)) {
      tempObj[key] = flattenNestedAdoptionObjectForFormBuilder(value);
    }
    setToShow({ ...tempObj });
  }, [type]);

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

      <section className="bg-gradient-to-br from-brand-50 via-white to-white">
        <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10 lg:py-14">
          <SectionEyebrow text="Adoption application" />
          <h1 className="text-4xl font-semibold text-gray-900 sm:text-5xl font-poppins">
            Adopt a <span className="text-brand">{type}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 font-poppins">
            Thank you for choosing adoption. Please complete the application
            below so we can help you find the perfect match for your home.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-start gap-8 pb-16 pt-4 xl:grid-cols-[minmax(0,1fr),21rem]">
        <form className="flex w-full flex-col items-center justify-center">
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
                <FieldSet id="About-you" legendText="1. About You">
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"adoption"}
                    category={"aboutQuestions"}
                  />
                </FieldSet>
                <FieldSet
                  id={type + "-matching-questions"}
                  legendText={`2. ${type} Matching Questions`}
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
                <FieldSet id="Home-Questions" legendText="3. Home Questions">
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
                  legendText={`4. ${type} Questions`}
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
                  legendText={"6. How did you hear about us?"}
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
              </FormikFormContainer>
            )}
          </Formik>
        </form>

        <aside className="flex w-full flex-col gap-6 xl:sticky xl:top-24">
          <AdoptionProcessCard />
          <AdoptionCriteriaCard type={type} />
          <NeedHelpCard />
        </aside>
      </div>

      <FooterSection />
    </>
  );
}

export default Index;

export async function getServerSideProps(context: { query: { type: any } }) {
  // get the query from the url to decide whether to show Dog or Cat form
  return {
    props: {
      type: context.query.type === "Cat" ? "Cat" : "Dog",
    },
  };
}
