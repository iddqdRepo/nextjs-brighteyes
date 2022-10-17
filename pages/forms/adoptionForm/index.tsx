import React, { Key, useState, useEffect } from "react";
import { Field, Formik } from "formik";
import { FieldSet } from "../../../components/IndividualFormLayout/FormComponents";
import { clsx } from "clsx";
import { AdoptionSchema } from "../../../utils/yup/yupSchema";
import { adoptionInitialValues } from "../../../utils/formik/initialValues";
import { formBuilder } from "../../../utils/formik/formBuilder";
import { FormBuilderInterface } from "../../../interfaces/formBuilderInterface";
import {
  InitialValuesInterface,
  ivAboutQuestionsInterface,
  ivHomeQuestionsInterface,
  ivDogMatchingQuestionsInterface,
  ivCatMatchingQuestionsInterface,
  ivDogQuestionsInterface,
  ivCatQuestionsInterface,
  ivHearAboutUsInfoInterface,
} from "../../../interfaces/initialValuesInterface";

function Index({ type }: { type: string }) {
  const [toShow, setToShow] = useState({} as InitialValuesInterface);

  interface tempObjInterface {
    [key: string]: string;
  }
  useEffect(() => {
    /*
    ^ FormBuilder needs flattened, legacy (how the db was set up with nested objects)
    ^ Flattened with the following recursive function instead of manually to keep the object path
    * e.g."gardenOrYardInfo.gardenOrYardSize" so it can be stored in the correct place in the db
   */
    let tempObj: any = {};
    const flattenObj = (objToFlatten: keyof FormBuilderInterface) => {
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

    for (const [key, value] of Object.entries(formBuilder)) {
      tempObj[key] = flattenObj(value);
    }

    setToShow({ ...tempObj });
  }, []);

  function Label({
    text,
    hFor,
    classN,
  }: {
    text: string;
    hFor: string;
    classN?: string;
  }) {
    return (
      <label
        htmlFor={hFor}
        className={clsx(
          "block mb-2 w-48 text-center h-fit text-sm font-medium font-poppins text-gray-900 ",
          classN
        )}
      >
        {text}
      </label>
      // <label
      //   htmlFor={hFor}
      //   className={clsx(
      //     "flex flex-col mb-2 text-center w-48 items-center justify-end  h-10 text-sm font-medium font-poppins text-gray-900 ",
      //     classN
      //   )}
      // >
      //   {text}
      // </label>
    );
  }

  const InputTextFormik = ({
    labelText,
    forNameId,
    val,
    classN,
    type,
    children,
  }: {
    labelText: string;
    val: string;
    forNameId: string;
    classN?: string;
    type?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
        <Label text={labelText} hFor={val} />

        <Field
          className={clsx(
            "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 ",
            classN
          )}
          name={forNameId}
          type={type && type}
        />
        {children}
      </div>
    );
  };

  const exposeOrHideFields = (
    category: keyof InitialValuesInterface,
    val:
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
      | keyof ivHearAboutUsInfoInterface,
    hideOrExpose: string
  ) => {
    let exposeTemp = toShow as InitialValuesInterface;

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
    category: keyof InitialValuesInterface
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
    category: keyof InitialValuesInterface;
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

  const CheckboxPlanningFormik = () => {
    return (
      <div className="flex flex-col items-center justify-center mb-4 mr-2">
        <Label
          text={"Are you planning any of the following in the next 6 months"}
          hFor={""}
          classN="w-60"
        />
        <label>
          <Field
            type="checkbox"
            name={`homeQuestions["planning>baby"]`}
            value="Yes"
          />
          {toShow.homeQuestions["planning>baby"].title}
        </label>
        <label>
          <Field
            type="checkbox"
            name={`homeQuestions["planning>moving"]`}
            value="Yes"
          />
          {toShow.homeQuestions["planning>moving"].title}
        </label>
        <label>
          <Field
            type="checkbox"
            name={`homeQuestions["planning>workHoursChange"]`}
            value="Yes"
          />
          {toShow.homeQuestions["planning>workHoursChange"].title}
        </label>
        <label>
          <Field
            type="checkbox"
            name={`homeQuestions["planning>holiday"]`}
            value="Yes"
          />
          {toShow.homeQuestions["planning>holiday"].title}
        </label>
      </div>
    );
  };

  const ErrorFormik = ({
    err,
    touch,
    field,
    parent,
  }: {
    err: any;
    touch: any;
    field:
      | keyof ivAboutQuestionsInterface
      | keyof ivDogMatchingQuestionsInterface
      | keyof ivCatMatchingQuestionsInterface
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
      | keyof ivHearAboutUsInfoInterface;
    parent: keyof InitialValuesInterface;
  }) => {
    return (
      <>
        {err?.[parent]?.[field] && touch?.[parent]?.[field] ? (
          <div className="text-xs text-red-600">{err?.[parent]?.[field]}</div>
        ) : (
          <div className="mt-4"></div>
        )}
      </>
    );
  };

  const QuestionsMap = ({
    category,
    values,
    err,
    touch,
  }: {
    category: keyof InitialValuesInterface;
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
          return (
            <>
              {entry[1].type === "text" ? (
                !entry[1].hidden ? (
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
                ) : (
                  <></>
                )
              ) : (
                <>
                  {entry[1].type === "select" ? (
                    !entry[1].hidden ? (
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
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          );
        })}
      </>
    ) : (
      <div>loading</div>
    );
  };

  return (
    <form className="flex flex-col items-center justify-center ">
      <div className="flex justify-center w-3/6">
        <div className="m-3 mt-10 text-2xl font-medium text-center text-gray-900 font-poppins">
          Adopt a {type} Form
        </div>
        &nbsp;
      </div>
      <Formik
        initialValues={adoptionInitialValues}
        validationSchema={AdoptionSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, errors, touched }) => (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
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
                {toShow!.homeQuestions ? <CheckboxPlanningFormik /> : <></>}
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
              <FieldSet legendText={"Legal Agreement"}>
                <ul className="flex flex-col ">
                  <span className="mb-5 font-medium text-gray-900 font-poppins">
                    By submitting this form you understand and agree to the
                    following:
                  </span>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that the {type} will be rehomed to me as a
                    house pet and is not to be kept closed in a kennel or shed,
                    the {type} will NOT be chained up outside.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    The {type} is being rehomed to me as a companion, not as a
                    guard animal or for fighting or breeding purposes
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    Bright Eyes Animal Sanctuary will at all times retain
                    ownership of the {type}, and reserve the right to reclaim it
                    if they feel the {type} is not being fed, housed or cared
                    for to their satisfaction.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    Should I wish to no longer care for the {type} I will return
                    it to Bright Eyes Animal Sanctuary. I will not sell, give
                    away or dispose of the {type} in any other way. The {type}{" "}
                    may only be “Put to Sleep” on the advice of a qualified vet,
                    and Bright Eyes Animal Sanctuary must be notified in
                    Advance.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that when I&apos;m away on holiday, I will need
                    to place the {type} in registered kennels or cattery, or
                    arrange for the {type} to be looked after by a responsible
                    adult.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that all {type}&apos;s leaving Bright Eyes
                    Animal Sanctuary must be neutered. Where the {type} has been
                    rehomed but is not neutered I agree that I will return the{" "}
                    {type} to be neutered or undertake to ensure that the
                    neutering is carried out by a fully qualified vet.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that full liability for any veterinary fees, or
                    costs arising from any incident, damages or injury incurred
                    at any future date will be mine and remain mine while I am
                    responsible for the {type}.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that although Bright Eyes Animal Sanctuary
                    tells me everything they know about the {type}, they do not
                    always have a complete history and therefore cannot
                    guarantee behaviour etc.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I confirm that Bright Eyes Animal Sanctuary may contact my
                    landlord to confirm that my tenancy agreement allows pets.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I confirm that Bright Eyes Animal Sanctuary may contact my
                    Vet to confirm that I am a responsible owner.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    I understand that I must bring valid photographic I.D. when
                    collecting the {type} I am rehoming.
                  </li>
                  <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
                    A MINIMUM REHOMING DONATION OF £{type === "Dog" ? 125 : 30}{" "}
                    IS REQUESTED.
                  </li>
                </ul>
              </FieldSet>
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
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </div>
          </div>
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
