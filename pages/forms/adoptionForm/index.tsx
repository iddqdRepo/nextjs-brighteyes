import React, { Key, useState, useEffect } from "react";
import { Field, Formik } from "formik";
import {
  FieldSet,
  Label,
  ErrorFormik,
  InputTextFormik,
} from "../../../components/IndividualFormLayout/FormComponents";
import { AdoptionSchema } from "../../../utils/yup/adoptionYupSchema";
import { adoptionFormBuilder } from "../../../utils/formik/adoptionFormBuilder";
import { AdoptionFormBuilderInterface } from "../../../interfaces/adoptionFormBuilderInterface";
import {
  AdoptionInitialValuesInterface,
  ivAboutQuestionsInterface,
  ivHomeQuestionsInterface,
  ivDogMatchingQuestionsInterface,
  ivCatMatchingQuestionsInterface,
  ivDogQuestionsInterface,
  ivCatQuestionsInterface,
  ivHearAboutUsInfoInterface,
} from "../../../interfaces/adoptionInitialValuesInterface";
import {
  FormikFormContainer,
  FormPageTitle,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import { adoptionInitialValues } from "../../../utils/formik/adoptionInitialValues";
import { CheckboxPlanningFormik } from "../../../components/IndividualFormLayout/AdoptionFormLayoutComponents";
import { LegalAgreementSection } from "../../../components/IndividualFormLayout/AdoptionFormLayout";

function Index({ type }: { type: string }) {
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
      // console.log("objToFlatten", objToFlatten);

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

  const exposeOrHideFields = (
    category: keyof AdoptionInitialValuesInterface,
    val:
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
      | keyof ivHearAboutUsInfoInterface,
    hideOrExpose: string
  ) => {
    let exposeTemp = toShow as AdoptionInitialValuesInterface;

    if (category === "homeQuestions") {
      if (hideOrExpose === "expose") {
        exposeTemp[category][val as keyof ivHomeQuestionsInterface].hidden =
          false;
      } else {
        exposeTemp[category][val as keyof ivHomeQuestionsInterface].hidden =
          true;
      }
    }
    if (category === "dogQuestions") {
      if (hideOrExpose === "expose") {
        exposeTemp[category][val as keyof ivDogQuestionsInterface].hidden =
          false;
      } else {
        exposeTemp[category][val as keyof ivDogQuestionsInterface].hidden =
          true;
      }
    }
    if (category === "catQuestions") {
      if (hideOrExpose === "expose") {
        exposeTemp[category][val as keyof ivCatQuestionsInterface].hidden =
          false;
      } else {
        exposeTemp[category][val as keyof ivCatQuestionsInterface].hidden =
          true;
      }
    }
    if (category === "hearAboutUsInfo") {
      if (hideOrExpose === "expose") {
        exposeTemp[category][val as keyof ivHearAboutUsInfoInterface].hidden =
          false;
      } else {
        exposeTemp[category][val as keyof ivHearAboutUsInfoInterface].hidden =
          true;
      }
    }
    setToShow(exposeTemp);
  };

  const handleExposeAndHideFields = (
    ev: { target: any },
    exposes: {
      [key: string]: (
        | keyof ivHomeQuestionsInterface
        | keyof ivDogQuestionsInterface
        | keyof ivCatQuestionsInterface
      )[];
    },
    category: keyof AdoptionInitialValuesInterface
  ) => {
    for (const [key, value] of Object.entries(exposes)) {
      if (ev.target.value === key) {
        value.forEach((val) => {
          console.log("exposing", category, val);
          exposeOrHideFields(category, val, "expose");
        });
      } else {
        if (
          //^ This added because "As an Adult" and "As a Child" both reveal the same hidden fields,
          //^ this stops them being hidden if "As an Adult" is selected then switched to "As a Child"
          ev.target.value !== "As an Adult" &&
          ev.target.value !== "As a Child"
        ) {
          value.forEach((val) => {
            exposeOrHideFields(category, val, "hide");
          });
        }
      }
    }
  };

  const DropdownFormik = ({
    labelText,
    selectArray,
    children,
    forNameId,
    exposes,
    category,
  }: {
    labelText: string;
    selectArray: string[];
    children: React.ReactNode;
    forNameId: string;
    exposes?: {
      [key: string]: (
        | keyof ivHomeQuestionsInterface
        | keyof ivDogQuestionsInterface
        | keyof ivCatQuestionsInterface
      )[];
    };
    path?: string;
    category: keyof AdoptionInitialValuesInterface;
  }) => {
    return (
      <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
        <Label text={labelText} hFor={forNameId} />
        <Field
          className={
            "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
          }
          name={forNameId}
          as="select"
          onClick={(e: { target: { value: any } }) => {
            if (e.target.value && exposes) {
              handleExposeAndHideFields(e, exposes, category);
            }
          }}
        >
          {selectArray ? (
            selectArray.map((entries) => {
              return (
                <option key={entries[0] as Key} value={entries[1]}>
                  {entries[0]}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </Field>
        {children}
      </div>
    );
  };
  const QuestionsMap = ({
    category,
    values,
    err,
    touch,
  }: {
    category: keyof AdoptionInitialValuesInterface;
    values: any;
    err: any;
    touch: any;
  }) => {
    return toShow[category] ? (
      <>
        {Object.entries(toShow[category]).map((entry) => {
          let title = entry[1].title as
            | keyof ivAboutQuestionsInterface
            | keyof ivDogMatchingQuestionsInterface
            | keyof ivCatMatchingQuestionsInterface
            | keyof ivHomeQuestionsInterface
            | keyof ivDogQuestionsInterface
            | keyof ivCatQuestionsInterface
            | keyof ivHearAboutUsInfoInterface;
          let field = entry[0] as
            | keyof ivAboutQuestionsInterface
            | keyof ivDogMatchingQuestionsInterface
            | keyof ivCatMatchingQuestionsInterface
            | keyof ivHomeQuestionsInterface
            | keyof ivDogQuestionsInterface
            | keyof ivCatQuestionsInterface
            | keyof ivHearAboutUsInfoInterface;
          return entry[1].type === "text"
            ? !entry[1].hidden && (
                <InputTextFormik
                  key={entry[0] as Key}
                  labelText={title}
                  val={values[category][field]}
                  forNameId={`${category}.${entry[0]}`}
                  type={entry[0] === "email" ? "email" : ""}
                >
                  <ErrorFormik
                    err={err}
                    touch={touch}
                    field={field}
                    parent={category}
                  />
                </InputTextFormik>
              )
            : entry[1].type === "select" && !entry[1].hidden && (
                <DropdownFormik
                  key={entry[0] as Key}
                  labelText={title}
                  forNameId={`${category}.${entry[0]}`}
                  selectArray={entry[1].values}
                  exposes={entry[1].exposes ? entry[1].exposes : ""}
                  path={`${category}.${entry[0]}`}
                  category={category}
                >
                  <ErrorFormik
                    err={err}
                    touch={touch}
                    field={field}
                    parent={category}
                  />
                </DropdownFormik>
              );
        })}
      </>
    ) : (
      <div>loading</div>
    );
  };
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
                category={"aboutQuestions"}
                values={values}
                touch={touched}
                err={errors}
              />
            </FieldSet>
            <FieldSet legendText={type + " Matching Questions"}>
              {type === "Dog" ? (
                <QuestionsMap
                  category={"dogMatchingQuestions"}
                  values={values}
                  touch={touched}
                  err={errors}
                />
              ) : (
                <QuestionsMap
                  category={"catMatchingQuestions"}
                  values={values}
                  touch={touched}
                  err={errors}
                />
              )}
            </FieldSet>
            <FieldSet legendText="Home Questions">
              <QuestionsMap
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
                  category={"dogQuestions"}
                  values={values}
                  err={errors}
                  touch={touched}
                />
              ) : (
                <QuestionsMap
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
