import React, { Key } from "react";
import { Field, Formik } from "formik";
import {
  FieldSet,
  // InputTextFormik,
  // Label,
} from "../../../components/FormLayout/FormComponents";
import { clsx } from "clsx";
import { AdoptionSchema } from "../../../utils/yup/yupSchema";
import { adoptionInitialValues } from "../../../utils/formik/initialValues";
import { formBuilder } from "../../../utils/formik/formBuilder";

interface InitialValuesInterface {
  type: string;
  aboutQuestions: aboutQuestionsInterface;
}
interface aboutQuestionsInterface {
  title: string;
  name: string;
  address: string;
  postcode: string;
  phone: string;
  mobile: string;
  email: string;
}

interface dogMatchingQuestionsInterface {
  dogName: string;
  dogSize: string;
  dogType: string;
  dogAge: string;
  dogSex: string;
}
interface catMatchingQuestionsInterface {
  catName: string;
  catAge: string;
  catType: string;
  catColour: string;
  catSex: string;
  catAllergy: string;
}

function Index({ type }: { type: string }) {
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
          "block mb-2 w-48 text-center h-10 text-sm font-medium font-poppins text-gray-900 dark:text-gray-300",
          classN
        )}
      >
        {text}
      </label>
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
      <div className="flex flex-col items-center justify-center mb-4 mr-2">
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

  const DropdownFormik = ({
    labelText,
    val,
    selectArray,
    children,
    forNameId,
  }: {
    labelText: string;
    val: string;
    selectArray: string[];
    children: React.ReactNode;
    forNameId: string;
  }) => {
    return (
      <div className="flex flex-col items-center justify-center mb-4 mr-2">
        <Label text={labelText} hFor={val} />
        <Field
          className={
            "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
          }
          name={forNameId}
          as="select"
        >
          {selectArray.map((entries) => {
            return <option value={entries[1]}>{entries[0]}</option>;
          })}
        </Field>
        {children}
      </div>
    );
  };

  return (
    <form className="flex flex-col items-center justify-center ">
      <div className="flex justify-start w-3/6">
        <div className="m-3 mt-10 text-xl font-semibold text-black-600">
          Adopt Animal
        </div>
      </div>
      <Formik
        initialValues={adoptionInitialValues}
        validationSchema={AdoptionSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, handleChange, errors, touched }) => (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-11/12 p-8 bg-white border rounded-md shadow-md">
              <FieldSet legendText="About you">
                <div className="flex ">
                  {Object.entries(adoptionInitialValues.aboutQuestions).map(
                    (entry) => {
                      const capitalized =
                        entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
                      return (
                        <>
                          <InputTextFormik
                            key={entry[0] as Key}
                            labelText={capitalized}
                            val={
                              values.aboutQuestions[
                                entry[0] as keyof aboutQuestionsInterface
                              ]
                            }
                            forNameId={`aboutQuestions.${entry[0]}`}
                            type={entry[0] === "email" ? "email" : ""}
                          >
                            {errors?.aboutQuestions?.[
                              entry[0] as keyof aboutQuestionsInterface
                            ] &&
                            touched?.aboutQuestions?.[
                              entry[0] as keyof aboutQuestionsInterface
                            ] ? (
                              <div className="text-xs text-red-600">
                                {
                                  errors?.aboutQuestions?.[
                                    entry[0] as keyof aboutQuestionsInterface
                                  ]
                                }
                              </div>
                            ) : (
                              <div className="mt-4"></div>
                            )}
                          </InputTextFormik>
                        </>
                      );
                    }
                  )}
                </div>
              </FieldSet>
              <FieldSet legendText={type + " Matching Questions"}>
                {type === "Dog" ? (
                  <div className="flex ">
                    {Object.entries(
                      adoptionInitialValues.dogMatchingQuestions
                    ).map((entry) => {
                      const value =
                        entry[0] as keyof dogMatchingQuestionsInterface;
                      return (
                        <>
                          {formBuilder.dogMatchingQuestions[value].type ===
                          "text" ? (
                            <InputTextFormik
                              key={entry[0] as Key}
                              labelText={
                                formBuilder.dogMatchingQuestions[value].title
                              }
                              val={values.dogMatchingQuestions[value]}
                              forNameId={`dogMatchingQuestions[${entry[0]}]`}
                            >
                              {errors?.dogMatchingQuestions?.[value] &&
                              touched?.dogMatchingQuestions?.[value] ? (
                                <div className="text-xs text-red-600">
                                  {errors?.dogMatchingQuestions?.[value]}
                                </div>
                              ) : (
                                <div className="mt-4"></div>
                              )}
                            </InputTextFormik>
                          ) : (
                            <DropdownFormik
                              key={entry[0] as Key}
                              labelText={
                                formBuilder.dogMatchingQuestions[value].title
                              }
                              val={values.dogMatchingQuestions[value]}
                              forNameId={`dogMatchingQuestions[${entry[0]}]`}
                              selectArray={
                                formBuilder.dogMatchingQuestions[value].values
                              }
                            >
                              {errors?.dogMatchingQuestions?.[value] &&
                              touched?.dogMatchingQuestions?.[value] ? (
                                <div className="text-xs text-red-600">
                                  {errors?.dogMatchingQuestions?.[value]}
                                </div>
                              ) : (
                                <div className="mt-4"></div>
                              )}
                            </DropdownFormik>
                          )}
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex ">
                    {Object.entries(
                      adoptionInitialValues.catMatchingQuestions
                    ).map((entry) => {
                      const value =
                        entry[0] as keyof catMatchingQuestionsInterface;
                      return (
                        <>
                          {formBuilder.catMatchingQuestions[value].type ===
                          "text" ? (
                            <InputTextFormik
                              key={entry[0] as Key}
                              labelText={
                                formBuilder.catMatchingQuestions[value].title
                              }
                              val={values.catMatchingQuestions[value]}
                              forNameId={`catMatchingQuestions[${entry[0]}]`}
                            >
                              {errors?.catMatchingQuestions?.[value] &&
                              touched?.catMatchingQuestions?.[value] ? (
                                <div className="text-xs text-red-600">
                                  {errors?.catMatchingQuestions?.[value]}
                                </div>
                              ) : (
                                <div className="mt-4"></div>
                              )}
                            </InputTextFormik>
                          ) : (
                            <DropdownFormik
                              key={entry[0] as Key}
                              labelText={
                                formBuilder.catMatchingQuestions[value].title
                              }
                              val={values.catMatchingQuestions[value]}
                              forNameId={`catMatchingQuestions[${entry[0]}]`}
                              selectArray={
                                formBuilder.catMatchingQuestions[value].values
                              }
                            >
                              {errors?.catMatchingQuestions?.[value] &&
                              touched?.catMatchingQuestions?.[value] ? (
                                <div className="text-xs text-red-600">
                                  {errors?.catMatchingQuestions?.[value]}
                                </div>
                              ) : (
                                <div className="mt-4"></div>
                              )}
                            </DropdownFormik>
                          )}
                        </>
                      );
                    })}
                  </div>
                )}
              </FieldSet>
              <FieldSet legendText="Home Questions">
                <div className="flex ">
                  {Object.entries(adoptionInitialValues.aboutQuestions).map(
                    (entry) => {
                      const capitalized =
                        entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
                      return (
                        <>
                          <InputTextFormik
                            key={entry[0] as Key}
                            labelText={capitalized}
                            val={
                              values.aboutQuestions[
                                entry[0] as keyof aboutQuestionsInterface
                              ]
                            }
                            forNameId={`aboutQuestions.${entry[0]}`}
                            type={entry[0] === "email" ? "email" : ""}
                          >
                            {errors?.aboutQuestions?.[
                              entry[0] as keyof aboutQuestionsInterface
                            ] &&
                            touched?.aboutQuestions?.[
                              entry[0] as keyof aboutQuestionsInterface
                            ] ? (
                              <div className="text-xs text-red-600">
                                {
                                  errors?.aboutQuestions?.[
                                    entry[0] as keyof aboutQuestionsInterface
                                  ]
                                }
                              </div>
                            ) : (
                              <div className="mt-4"></div>
                            )}
                          </InputTextFormik>
                        </>
                      );
                    }
                  )}
                </div>
              </FieldSet>

              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </div>
        )}
      </Formik>
    </form>
  );
}

export default Index;

export async function getServerSideProps(context: { query: { type: any } }) {
  console.log("context =", context.query.type);

  return {
    props: {
      type: context.query.type,
    },
  };
}
