import React, { Key, useState, useEffect } from "react";
import { Field, Formik } from "formik";
import { FieldSet } from "../../../components/FormLayout/FormComponents";
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
    // let tempEntries = Object.entries(formBuilder);
    let tempObj: any = {};

    const flattenObj = (objToFlatten: keyof FormBuilderInterface) => {
      let result = {} as tempObjInterface;
      // console.log("objToFlatten", objToFlatten);

      for (const [i, v] of Object.entries(objToFlatten)) {
        if (typeof v === "object" && !Array.isArray(v)) {
          const tempFlatten = flattenObj(v);

          for (const [j, jValue] of Object.entries(tempFlatten)) {
            // console.log("j =", j, "tempFlatten[j] =", jValue);
            /*
             * result needs to be joined with ">" because formik splits on "."
             * which makes flattening pointless as it's rebuilt in initialValues
             * when passed into <Field name={}/> making initialValues not Match toShow
             * this causes bugs on expose() etc
             */
            // console.log(
            //   " result[i + " > " + j] = temp[j] ",
            //   (result[i + ">" + j] = jValue)
            // );
            result[i + ">" + j] = jValue;
          }
        } else {
          result[i] = v[0];
        }
      }
      //console.log("result =", result);
      return result;
    };
    //console.log("tempEntries =", tempEntries);

    for (const [key, value] of Object.entries(formBuilder)) {
      //console.log("key = ", key);
      //console.log("value =", value);
      // console.log(
      //   "formBuilder[nest[0]]",
      //   formBuilder[key as keyof FormBuilderInterface]
      // );
      tempObj[key] = flattenObj(value);
    }

    //console.log("tempObj = ", tempObj);
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

  const expose = (
    category: keyof InitialValuesInterface,
    val:
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
  ) => {
    let exposeTemp = toShow as InitialValuesInterface;

    if (category === "homeQuestions") {
      exposeTemp[category][val as keyof ivHomeQuestionsInterface].hidden =
        false;
    }
    if (category === "dogQuestions") {
      // console.log("EXPOSING: ", exposeTemp[category][val]);
      exposeTemp[category][val as keyof ivDogQuestionsInterface].hidden = false;
    }
    if (category === "catQuestions") {
      exposeTemp[category][val as keyof ivCatQuestionsInterface].hidden = false;
    }
    setToShow(exposeTemp);
  };

  const hide = (
    category: keyof InitialValuesInterface,
    val:
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
  ) => {
    let exposeTemp = toShow as InitialValuesInterface;

    if (category === "homeQuestions") {
      exposeTemp[category][val as keyof ivHomeQuestionsInterface].hidden = true;
    }
    if (
      category === "dogQuestions" &&
      exposeTemp[category][val as keyof ivDogQuestionsInterface].hidden !== true
    ) {
      // console.log("HIDING: ", exposeTemp[category][val]);

      exposeTemp[category][val as keyof ivDogQuestionsInterface].hidden = true;
    }
    if (category === "catQuestions") {
      exposeTemp[category][val as keyof ivCatQuestionsInterface].hidden = true;
    }
    setToShow(exposeTemp);
  };

  const DropdownFormik = ({
    labelText,
    val,
    selectArray,
    children,
    forNameId,
    exposes,
    // path,
    category,
  }: {
    labelText: string;
    val: string;
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
    if (exposes) {
      for (const [key, value] of Object.entries(exposes)) {
        // console.log("NEW  KEY", key, "NEW VALUE", value);

        if (val !== key) {
          if (
            forNameId === "dogQuestions.ownOtherDogsPastInfo>ownOtherPastDogs"
          ) {
            console.log("KEt = ", key);
          }
          value.forEach((val) => {
            hide(category, val);
          });
        }
        if (val === key) {
          // console.group(path);
          // console.log("key =", key);
          // console.log("Value changed was:", labelText);

          value.forEach((val) => {
            // console.log("exposes val", val);
            // console.log("exposes category", category);
            // console.log("exposes", toShow);
            expose(category, val);
          });
        }
        //  else {
        //   value.forEach((val) => {
        //     hide(category, val);
        //   });
        // }
      }
      // const [key, value] = Object.entries(exposes)[0];
      // console.log("key", key, "value", value);
      // console.log("forNameId", forNameId);
      // console.log("category", category);
      // if (val === key) {
      //   // console.group(path);
      //   // console.log("key =", key);
      //   // console.log("Value changed was:", labelText);

      //   value.forEach((val) => {
      //     // console.log("exposes val", val);
      //     // console.log("exposes category", category);
      //     // console.log("exposes", toShow);
      //     expose(category, val);
      //   });
      // } else {
      //   value.forEach((val) => {
      //     hide(category, val);
      //   });
      // }
      // console.groupEnd();
    }

    return (
      <div className="flex flex-col items-center justify-center mb-4 mr-2">
        <Label text={labelText} hFor={forNameId} />
        <Field
          className={
            "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
          }
          name={forNameId}
          as="select"
          // onClick={(e) => {
          //   console.log("eee", e.target.value);
          // }}
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

  // const CheckboxPlanningFormik = ({}) => {
  //   return (
  //     <div className="flex flex-col items-center justify-center mb-4 mr-2">
  //       <div id="checkbox-group">Checked</div>
  //       <div role="group" aria-labelledby="checkbox-group">
  //         <label>
  //           <Field type="checkbox" name="checked" value="Yes" />
  //           One
  //         </label>
  //         <label>
  //           <Field type="checkbox" name="checked" value="Yes" />
  //           Two
  //         </label>
  //         <label>
  //           <Field type="checkbox" name="checked" value="Yes" />
  //           Three
  //         </label>
  //       </div>
  //     </div>
  //   );
  // };

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
                        val={values[category][field]}
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
      <div className="flex justify-start w-3/6">
        <div className="m-3 mt-10 text-xl font-semibold text-black-600">
          Adopt Animal
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
            <div className="flex flex-col items-center w-11/12 p-8 bg-white border rounded-md shadow-md">
              <FieldSet legendText="About you">
                <div className="flex ">
                  <QuestionsMap
                    category={"aboutQuestions"}
                    values={values}
                    touch={touched}
                    err={errors}
                  />
                </div>
              </FieldSet>
              <FieldSet legendText={type + " Matching Questions"}>
                <div className="flex ">
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
                </div>
              </FieldSet>
              <FieldSet legendText="Home Questions">
                <div className="flex flex-wrap w-full">
                  <QuestionsMap
                    category={"homeQuestions"}
                    values={values}
                    err={errors}
                    touch={touched}
                  />
                  {toShow!.homeQuestions ? (
                    <div className="flex flex-col items-center justify-center mb-4 mr-2">
                      <Label
                        text={
                          "Are you planning any of the following in the next 6 months"
                        }
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
                  ) : (
                    <></>
                  )}
                </div>
              </FieldSet>
              {/* //*---------------------------------------------------------------------------------------------------------------- */}
              <FieldSet legendText={type + " Questions"}>
                <div className="flex flex-wrap w-full ">
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
  // console.log("context =", context.query.type);

  return {
    props: {
      type: context.query.type,
    },
  };
}
