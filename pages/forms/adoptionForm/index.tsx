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
  const t = type; //placeholder for lint
  console.log(t);
  interface tempObjInterface {
    [key: string]: string;
  }
  useEffect(() => {
    /*
    ^ FormBuilder needs flattened, legacy (how the db was set up with nested objects)
    ^ Flattened with the following recursive function instead of manually to keep the object path
    * e.g."gardenOrYardInfo.gardenOrYardSize" so it can be stored in the correct place in the db
   */
    let tempEntries = Object.entries(formBuilder);
    let tempObj: any = {};

    const flattenObj = (objToFlatten: keyof FormBuilderInterface) => {
      let result = {} as tempObjInterface;
      console.log("objToFlatten", objToFlatten);

      for (const [i, v] of Object.entries(objToFlatten)) {
        if (typeof v === "object" && !Array.isArray(v)) {
          const tempFlatten = flattenObj(v);

          for (const [j, jValue] of Object.entries(tempFlatten)) {
            console.log("j =", j, "tempFlatten[j] =", jValue);
            /*
             * result needs to be joined with ">" because formik splits on "."
             * which makes flattening pointless as it's rebuilt in initialValues
             * when passed into <Field name={}/> making initialValues not Match toShow
             * this causes bugs on expose() etc
             */
            console.log(
              " result[i + " > " + j] = temp[j] ",
              (result[i + ">" + j] = jValue)
            );
            result[i + ">" + j] = jValue;
          }
        } else {
          result[i] = v[0];
        }
      }
      console.log("result =", result);
      return result;
    };
    console.log("tempEntries =", tempEntries);

    for (const [key, value] of Object.entries(formBuilder)) {
      console.log("key = ", key);
      console.log("value =", value);
      console.log(
        "formBuilder[nest[0]]",
        formBuilder[key as keyof FormBuilderInterface]
      );
      tempObj[key] = flattenObj(value);
    }

    console.log("tempObj = ", tempObj);
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

  // const expose = (
  //   current: keyof InitialValuesInterface,
  //   pathToExpose: keyof ivHomeQuestionsInterface
  // ) => {
  //   console.log("expose CURRENT = ", current);
  //   console.log("expose EXPOSING PATH ", pathToExpose);
  //   let exposeTemp: InitialValuesInterface = toShow;
  //   console.log("TEMP IS TOSHOW?", exposeTemp === toShow);
  //   // let b = temp[current]
  //   // console.group("in expose ()", temp[current][pathToExpose].title);
  //   // console.log("Setting path ", temp[current][pathToExpose].title, "to false");
  //   exposeTemp[current][pathToExpose].hidden = false;
  //   setToShow(exposeTemp);
  //   // setToShow({ ...exposeTemp });
  // };
  // const hide = (current: string, pathToExpose: string) => {
  //   console.group("HIDE");

  //   console.log("CURRENT = ", current);
  //   console.log("EXPOSING PATH ", pathToExpose);
  //   let temp = toShow;
  //   temp[current][pathToExpose].hidden = true;
  //   setToShow(temp);
  //   // console.log("TOSHOWPATHSTOEXPOSE", temp[current][pathToExpose]);
  //   console.groupEnd();
  // };

  const DropdownFormik = ({
    labelText,
    val,
    selectArray,
    children,
    forNameId,
    exposes,
    path,
    current,
  }: {
    labelText: string;
    val: string;
    selectArray: string[];
    children: React.ReactNode;
    forNameId: string;
    exposes?: {
      [key: string]: (keyof ivHomeQuestionsInterface)[];
    };
    path?: string;
    current?: keyof InitialValuesInterface;
  }) => {
    console.group(path);
    console.log("Value changed was:", labelText);
    console.log("val:", val);
    console.log("forNameId:", forNameId);
    console.groupEnd();

    if (exposes) {
      const [key, value] = Object.entries(exposes)[0];

      if (val === key) {
        console.group(path);
        console.log("Value changed was:", labelText);

        value.forEach((p: keyof ivHomeQuestionsInterface) => {
          console.log("exposes p", p);
          console.log("exposes", toShow);
          console.log("exposes current =", current);
          // expose("homeQuestions", p);
          let exposeTemp = toShow as InitialValuesInterface;
          console.log("exposes exposeTemp", exposeTemp);

          exposeTemp["homeQuestions"][p].hidden = false;
          setToShow(exposeTemp);
        });
      } else {
        value.forEach((p: string) => {
          console.log("PATH=", p);
          // let totalPaths = getNewPaths(p);
          // console.log("totalPaths", totalPaths);
          // hide("homeQuestions", p);
        });
      }
      console.groupEnd();
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
                  {toShow.aboutQuestions ? (
                    Object.entries(toShow.aboutQuestions).map((entry) => {
                      let title = entry[1]
                        .title as keyof ivAboutQuestionsInterface;
                      let field = entry[0] as keyof ivAboutQuestionsInterface;
                      return (
                        <>
                          <InputTextFormik
                            key={entry[0] as Key}
                            labelText={title}
                            val={values.aboutQuestions[field]}
                            forNameId={`aboutQuestions.${entry[0]}`}
                            type={entry[0] === "email" ? "email" : ""}
                          >
                            <ErrorFormik
                              err={errors}
                              touch={touched}
                              field={field}
                              parent={"aboutQuestions"}
                            />
                          </InputTextFormik>
                        </>
                      );
                    })
                  ) : (
                    <div>loading</div>
                  )}
                </div>
              </FieldSet>
              <FieldSet legendText={type + " Matching Questions"}>
                <div className="flex ">
                  {type === "Dog" ? (
                    toShow.dogMatchingQuestions ? (
                      Object.entries(toShow.dogMatchingQuestions).map(
                        (entry) => {
                          console.log("ENTRY 0 is", entry[0]);
                          let title = entry[1]
                            .title as keyof ivAboutQuestionsInterface;
                          const field =
                            entry[0] as keyof ivDogMatchingQuestionsInterface;
                          return (
                            <>
                              {entry[1].type === "text" ? (
                                <>
                                  <InputTextFormik
                                    key={entry[0] as Key}
                                    labelText={title}
                                    val={values.dogMatchingQuestions[field]}
                                    forNameId={`dogMatchingQuestions.${entry[0]}`}
                                    type={entry[0] === "email" ? "email" : ""}
                                  >
                                    <ErrorFormik
                                      err={errors}
                                      touch={touched}
                                      field={field}
                                      parent={"dogMatchingQuestions"}
                                    />
                                  </InputTextFormik>
                                </>
                              ) : (
                                <>
                                  <DropdownFormik
                                    key={entry[1].title as Key}
                                    labelText={entry[1].title}
                                    val={values.dogMatchingQuestions[field]}
                                    forNameId={`dogMatchingQuestions[${entry[0]}]`}
                                    selectArray={entry[1].values}
                                  >
                                    <ErrorFormik
                                      err={errors}
                                      touch={touched}
                                      field={field}
                                      parent={"dogMatchingQuestions"}
                                    />
                                  </DropdownFormik>
                                </>
                              )}
                            </>
                          );
                        }
                      )
                    ) : (
                      <div>loading</div>
                    )
                  ) : toShow.catMatchingQuestions ? (
                    Object.entries(toShow.catMatchingQuestions).map((entry) => {
                      let title = entry[1]
                        .title as keyof ivCatMatchingQuestionsInterface;
                      const field =
                        entry[0] as keyof ivCatMatchingQuestionsInterface;
                      return (
                        <>
                          {entry[1].type === "text" ? (
                            <>
                              <InputTextFormik
                                key={entry[0] as Key}
                                labelText={title}
                                val={values.catMatchingQuestions[field]}
                                forNameId={`catMatchingQuestions.${entry[0]}`}
                                type={entry[0] === "email" ? "email" : ""}
                              >
                                <ErrorFormik
                                  err={errors}
                                  touch={touched}
                                  field={field}
                                  parent={"catMatchingQuestions"}
                                />
                              </InputTextFormik>
                            </>
                          ) : (
                            <>
                              <DropdownFormik
                                key={entry[1].title as Key}
                                labelText={entry[1].title}
                                val={values.catMatchingQuestions[field]}
                                forNameId={`catMatchingQuestions[${entry[0]}]`}
                                selectArray={entry[1].values}
                              >
                                <ErrorFormik
                                  err={errors}
                                  touch={touched}
                                  field={field}
                                  parent={"catMatchingQuestions"}
                                />
                              </DropdownFormik>
                            </>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <div>loading</div>
                  )}
                </div>
              </FieldSet>
              <FieldSet legendText="Home Questions">
                {/* {console.log("toShow", toShow.homeQuestions)} */}
                {/* {console.log("values", values.homeQuestions)} */}

                <div className="flex flex-wrap w-full">
                  {toShow.homeQuestions ? (
                    Object.entries(toShow.homeQuestions).map((entry) => {
                      // const value = entry[0] as keyof homeQuestionsInterface;
                      return (
                        <>
                          {entry[1].type === "text" ? (
                            <>
                              {/* {console.log("entry hidden?", entry[0])} */}
                              {!entry[1].hidden ? (
                                <InputTextFormik
                                  key={entry[0] as Key}
                                  labelText={
                                    entry[1]
                                      .title as keyof ivHomeQuestionsInterface
                                  }
                                  val={
                                    values.homeQuestions[
                                      entry[0] as keyof ivHomeQuestionsInterface
                                    ]
                                  }
                                  forNameId={`homeQuestions.${entry[0]}`}
                                  type={entry[0] === "email" ? "email" : ""}
                                >
                                  {errors?.homeQuestions?.[
                                    entry[0] as keyof ivHomeQuestionsInterface
                                  ] &&
                                  touched?.homeQuestions?.[
                                    entry[0] as keyof ivHomeQuestionsInterface
                                  ] ? (
                                    <div className="text-xs text-red-600">
                                      {
                                        errors?.homeQuestions?.[
                                          entry[0] as keyof ivHomeQuestionsInterface
                                        ]
                                      }
                                    </div>
                                  ) : (
                                    <>
                                      <div className="mt-4"></div>
                                    </>
                                  )}
                                </InputTextFormik>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <>
                              {console.log(entry[1].title, " = ", entry[0])}
                              {entry[1].type === "select" ? (
                                !entry[1].hidden ? (
                                  <>
                                    <DropdownFormik
                                      key={entry[1].title as Key}
                                      labelText={entry[1].title}
                                      val={
                                        values.homeQuestions[
                                          entry[0] as keyof ivHomeQuestionsInterface
                                        ]
                                      }
                                      forNameId={`homeQuestions[${entry[0]}]`}
                                      selectArray={entry[1].values}
                                      exposes={
                                        entry[1].exposes ? entry[1].exposes : ""
                                      }
                                      path={`homeQuestions.${entry[0]}`}
                                      current={"homeQuestions"}
                                    >
                                      {/* <ErrorFormik
                                        err={errors}
                                        touch={touched}
                                        parent={`["${entry[0]}"]`}
                                        field={"homeQuestions"}
                                      /> */}
                                      {errors?.homeQuestions?.[
                                        entry[0] as keyof ivHomeQuestionsInterface
                                      ] &&
                                      touched?.homeQuestions?.[
                                        entry[0] as keyof ivHomeQuestionsInterface
                                      ] ? (
                                        <div className="text-xs text-red-600">
                                          {
                                            errors?.homeQuestions?.[
                                              entry[0] as keyof ivHomeQuestionsInterface
                                            ]
                                          }
                                        </div>
                                      ) : (
                                        <div className="mt-4"></div>
                                      )}
                                    </DropdownFormik>
                                  </>
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
                    })
                  ) : (
                    <div>loading</div>
                  )}
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
                    toShow.dogQuestions ? (
                      Object.entries(toShow.dogQuestions).map((entry) => {
                        const value = entry[1] as keyof ivDogQuestionsInterface;
                        return (
                          <>
                            {entry[1].type === "text" ? (
                              !entry[1].hidden ? (
                                <>
                                  {/* {console.log("entry type===text", entry)} */}
                                  <InputTextFormik
                                    key={entry[0] as Key}
                                    labelText={
                                      entry[1]
                                        .title as keyof ivDogQuestionsInterface
                                    }
                                    val={
                                      values.dogQuestions[
                                        entry[0] as keyof ivDogQuestionsInterface
                                      ]
                                    }
                                    forNameId={`dogQuestions.${entry[0]}`}
                                    type={entry[0] === "email" ? "email" : ""}
                                  >
                                    {errors?.dogQuestions?.[
                                      entry[0] as keyof ivDogQuestionsInterface
                                    ] &&
                                    touched?.dogQuestions?.[
                                      entry[0] as keyof ivDogQuestionsInterface
                                    ] ? (
                                      <div className="text-xs text-red-600">
                                        {
                                          errors?.dogQuestions?.[
                                            entry[0] as keyof ivDogQuestionsInterface
                                          ]
                                        }
                                      </div>
                                    ) : (
                                      <div className="mt-4"></div>
                                    )}
                                  </InputTextFormik>
                                </>
                              ) : (
                                <></>
                              )
                            ) : (
                              <>
                                {/* {console.log("entry type!==text", entry)} */}
                                {console.log("ENTRY1", entry[1])}
                                <DropdownFormik
                                  key={entry[1].title as Key}
                                  labelText={entry[1].title}
                                  val={values.dogQuestions[value]}
                                  forNameId={`dogQuestions[${entry[0]}]`}
                                  selectArray={entry[1].values}
                                >
                                  {errors?.dogQuestions?.[
                                    entry[0] as keyof ivDogQuestionsInterface
                                  ] &&
                                  touched?.dogQuestions?.[
                                    entry[0] as keyof ivDogQuestionsInterface
                                  ] ? (
                                    <div className="text-xs text-red-600">
                                      {
                                        errors?.dogQuestions?.[
                                          entry[0] as keyof ivDogQuestionsInterface
                                        ]
                                      }
                                    </div>
                                  ) : (
                                    <div className="mt-4"></div>
                                  )}
                                </DropdownFormik>
                              </>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <div>loading</div>
                    )
                  ) : toShow.catMatchingQuestions ? (
                    Object.entries(toShow.catMatchingQuestions).map((entry) => {
                      const value =
                        entry[1] as keyof ivCatMatchingQuestionsInterface;
                      return (
                        <>
                          {entry[1].type === "text" ? (
                            <>
                              {/* {console.log("entry type===text", entry)} */}
                              <InputTextFormik
                                key={entry[0] as Key}
                                labelText={
                                  entry[1]
                                    .title as keyof ivCatMatchingQuestionsInterface
                                }
                                val={
                                  values.catMatchingQuestions[
                                    entry[0] as keyof ivCatMatchingQuestionsInterface
                                  ]
                                }
                                forNameId={`catMatchingQuestions.${entry[0]}`}
                                type={entry[0] === "email" ? "email" : ""}
                              >
                                {errors?.catMatchingQuestions?.[
                                  entry[0] as keyof ivCatMatchingQuestionsInterface
                                ] &&
                                touched?.catMatchingQuestions?.[
                                  entry[0] as keyof ivCatMatchingQuestionsInterface
                                ] ? (
                                  <div className="text-xs text-red-600">
                                    {
                                      errors?.catMatchingQuestions?.[
                                        entry[0] as keyof ivCatMatchingQuestionsInterface
                                      ]
                                    }
                                  </div>
                                ) : (
                                  <div className="mt-4"></div>
                                )}
                              </InputTextFormik>
                            </>
                          ) : (
                            <>
                              {/* {console.log("entry type!==text", entry)} */}

                              <DropdownFormik
                                key={entry[1].title as Key}
                                labelText={entry[1].title}
                                val={values.catMatchingQuestions[value]}
                                forNameId={`catMatchingQuestions[${entry[0]}]`}
                                selectArray={entry[1].values}
                              >
                                {errors?.catMatchingQuestions?.[
                                  entry[0] as keyof ivCatMatchingQuestionsInterface
                                ] &&
                                touched?.catMatchingQuestions?.[
                                  entry[0] as keyof ivCatMatchingQuestionsInterface
                                ] ? (
                                  <div className="text-xs text-red-600">
                                    {
                                      errors?.catMatchingQuestions?.[
                                        entry[0] as keyof ivCatMatchingQuestionsInterface
                                      ]
                                    }
                                  </div>
                                ) : (
                                  <div className="mt-4"></div>
                                )}
                              </DropdownFormik>
                            </>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <div>loading</div>
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
