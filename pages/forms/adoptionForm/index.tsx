import React, { Key, useState, useEffect, useRef } from "react";
import { Field, FieldArray, Formik } from "formik";
import {
  FieldSet,
  // InputTextFormik,
  // Label,
} from "../../../components/FormLayout/FormComponents";
import { clsx } from "clsx";
import { AdoptionSchema } from "../../../utils/yup/yupSchema";
import { adoptionInitialValues } from "../../../utils/formik/initialValues";
import { formBuilder } from "../../../utils/formik/formBuilder";
import { flatFormBuilder } from "../../../utils/formik/flatFormBuilder";

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
  const [toShow, setToShow] = useState({});
  const [render, setRender] = useState([]);
  const renderCounter = useRef(0);
  console.log(renderCounter.current);
  const Counter = () => {
    renderCounter.current = renderCounter.current + 1;
    return <h1>Renders: {renderCounter.current}</h1>;
  };

  const doRender = () => {
    console.log("DORENDEr");
    let temp = render;
    temp.push(1);
    console.log(temp);
    setRender([...temp]);
  };

  useEffect(() => {
    /*
    ^ FormBuilder needs flattened, legacy (how the db was set up with nested objects)
    ^ Flattened with the following recursive function instead of manually to keep the object path
    * e.g."gardenOrYardInfo.gardenOrYardSize" so it can be stored in the correct place in the db
   */

    console.log(Object.entries(formBuilder));
    let temp = Object.entries(formBuilder);
    // let tempStore = [];
    let tempObj = {};

    const flattenObj = (ob) => {
      let result = {};
      for (const i in ob) {
        if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
          const temp = flattenObj(ob[i]);
          for (const j in temp) {
            /*
             * result needs to be joined with ">" because formik splits on "."
             * which makes flattening pointless as it's rebuilt in initialValues
             * when passed into <Field name={}/> making initialValues not Match toShow
             * this causes bugs on expose() etc
             */
            result[i + ">" + j] = temp[j];
          }
        } else {
          result[i] = ob[i][0];
        }
      }
      return result;
    };

    // temp.forEach((nest) => {
    //   console.log("temp = ", temp);
    //   tempStore.push({ [nest[0]]: flattenObj(formBuilder[nest[0]]) });
    // });
    temp.forEach((nest) => {
      console.log("temp = ", temp);
      tempObj[nest[0]] = flattenObj(formBuilder[nest[0]]);
    });
    // console.log("tempStore = ", tempStore);
    console.log("tempObj = ", tempObj);
    console.log("initialValues = ", adoptionInitialValues);
    setToShow(tempObj);
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

  const expose = (current, pathToExpose) => {
    console.log("CURRENT = ", current);
    console.log("EXPOSING PATH ", pathToExpose);
    console.log("expose() ", pathToExpose);
    let temp = toShow;
    // console.group("in expose ()", temp[current][pathToExpose].title);
    // console.log("Setting path ", temp[current][pathToExpose].title, "to false");
    temp[current][pathToExpose].hidden = false;
    console.log(
      "path",
      temp[current][pathToExpose].title,
      "is now",
      temp[current][pathToExpose].hidden
    );
    // console.log(
    //   "PATH",
    //   temp[current][pathToExpose],
    //   "hidden set to",
    //   temp[current][pathToExpose].hidden
    // );
    setToShow(temp);
    // console.log("TOSHOWPATHSTOEXPOSE", temp[current][pathToExpose]);
    // console.groupEnd();
  };
  const hide = (current, pathToExpose) => {
    console.group("HIDE");

    console.log("CURRENT = ", current);
    console.log("EXPOSING PATH ", pathToExpose);
    let temp = toShow;
    temp[current][pathToExpose].hidden = true;
    setToShow(temp);
    // console.log("TOSHOWPATHSTOEXPOSE", temp[current][pathToExpose]);
    console.groupEnd();
  };

  const DropdownFormik = ({
    labelText,
    val,
    selectArray,
    children,
    forNameId,
    exposes,
    path,
  }: {
    labelText: string;
    val: string;
    selectArray: string[];
    children: React.ReactNode;
    forNameId: string;
  }) => {
    // const getNewPaths = (toExposePath) => {
    //   console.log("GETTING NEW PATH ", toExposePath);
    //   let temp = toExposePath;
    //   let newPath = temp.split(".");
    //   console.log("newPath =", newPath);
    //   return newPath;
    // };

    if (labelText === "FULLY ENCLOSED") {
      console.group(path);
      console.log("Value changed was:", labelText);
      console.log("val:", val);
      console.log("forNameId:", forNameId);
      console.groupEnd();
    }

    if (exposes) {
      const [key, value] = Object.entries(exposes)[0];
      // console.log(
      //   "Value changed was:",
      //   labelText,
      //   "should be:",
      //   key,
      //   "is",
      //   val
      // );

      if (val === key) {
        console.group(path);
        console.log("Value changed was:", labelText);

        value.forEach((p) => {
          console.log("exposes", p);
          expose("homeQuestions", p);
        });
      }
      // else {
      //   value.forEach((p) => {
      //     console.log("PATH=", p);
      //     // let totalPaths = getNewPaths(p);
      //     // console.log("totalPaths", totalPaths);
      //     // hide("homeQuestions", p);
      //   });
      // }
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
          // name="homeQuestions[gardenOrYardInfo>gardenOrYardSize]"
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

  const ErrorFormik = ({ err, touch, main, field }) => {
    // console.log("INERROR", field);
    // {errors?.homeQuestions?.[entry[0] as keyof homeQuestionsInterface] &&
    //   touched?.homeQuestions?.[entry[0] as keyof homeQuestionsInterface] ? (
    //     <div className="text-xs text-red-600">
    //       {errors?.homeQuestions?.[entry[0] as keyof homeQuestionsInterface]}
    //     </div>
    //   ) : (
    //     <div className="mt-4">{/* {console.log("Value", value)} */}</div>
    //   )}
    if (err.homeQuestions) {
      console.log("IN err.homeQuestions.retired");
      console.log("err[main]", err[main][field]);
    }
    // console.log("errors =", err);
    return (
      // <>
      //   {err[main][field] && touch[main][field] ? (
      //     <div className="text-xs text-red-600">{err[main][field]}</div>
      //   ) : (
      //     <div className="mt-4"></div>
      //   )}
      // </>
      <>
        {err["homeQuestions"] && touch["homeQuestions"] ? (
          <div className="text-xs text-red-600">{}</div>
        ) : (
          <div className="mt-4"></div>
        )}
      </>
    );
  };

  // const BuildForm = () => {
  //   let tempShow = []
  //   Object.entries(mapValues).forEach(entry => {

  //     //if it's a nested object recursively check it.
  //     if(typeof yourVariable === 'object' &&
  //     !Array.isArray(yourVariable) &&
  //     yourVariable !== null
  // )

  //     if(formBuilder.homeQuestions[entry[0]].hidden){
  //       return
  //     }else{
  //       tempShow.push(entry[0])
  //     }

  //   })

  // }

  // const RenderFlattened = ({ ob }) => {
  //   // const toRender = flattenObj(b);

  //   // return toRender.map((el) => {
  //   //   console.log("el = ", el);
  //   //   return <div>{el.title}</div>;
  //   });
  // };
  // const flat = flattenObj(b)

  return (
    <form className="flex flex-col items-center justify-center ">
      <div className="flex justify-start w-3/6">
        <div className="m-3 mt-10 text-xl font-semibold text-black-600">
          Adopt Animal
        </div>
        &nbsp;
        {render.length} &nbsp;
        <div onClick={() => doRender()}>RERENDER</div>
      </div>
      {/* <RenderFlattened ob={b} /> */}
      {/* {toShow ? <pre>{JSON.stringify(toShow, null, 2)}</pre> : "loading"} */}

      <Formik
        initialValues={adoptionInitialValues}
        validationSchema={AdoptionSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ values, handleChange, errors, touched }) => (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-11/12 p-8 bg-white border rounded-md shadow-md">
              {/* PASTE OF OTHERS GOES IN HERE*/}
              <FieldSet legendText="Home Questions">
                {/* {console.log("toShow", toShow.homeQuestions)} */}
                {/* {console.log("values", values.homeQuestions)} */}
                {console.log(
                  "values.homeQuestions[gardenOrYardInfo.fullyEnclosed] = ",
                  values.homeQuestions
                )}
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
                                  labelText={entry[1].title as Key}
                                  val={values.homeQuestions[entry[0]]}
                                  forNameId={`homeQuestions.${entry[0]}`}
                                  type={entry[0] === "email" ? "email" : ""}
                                >
                                  {errors?.homeQuestions?.[
                                    entry[0] as keyof homeQuestionsInterface
                                  ] &&
                                  touched?.homeQuestions?.[
                                    entry[0] as keyof homeQuestionsInterface
                                  ] ? (
                                    <div className="text-xs text-red-600">
                                      {
                                        errors?.homeQuestions?.[
                                          entry[0] as keyof homeQuestionsInterface
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
                                <>
                                  <div>{entry[0]}</div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {/* {console.log(
                                "Title: ",
                                entry[1].title,
                                "| exposes:",
                                entry[1].exposes,
                                "| hidden :",
                                entry[1].hidden
                              )} */}
                              {console.log(entry[1].title, " = ", entry[0])}
                              {entry[1].type === "select" ? (
                                !entry[1].hidden ? (
                                  <>
                                    <DropdownFormik
                                      key={entry[1].title as Key}
                                      labelText={entry[1].title}
                                      val={values.homeQuestions[entry[0]]}
                                      forNameId={`homeQuestions[${entry[0]}]`}
                                      selectArray={entry[1].values}
                                      exposes={
                                        entry[1].exposes ? entry[1].exposes : ""
                                      }
                                      path={`homeQuestions.${entry[0]}`}
                                    >
                                      {/* <ErrorFormik
                                        err={errors}
                                        touch={touched}
                                        field={`["${entry[0]}"]`}
                                        main={"homeQuestions"}
                                      /> */}
                                      {errors?.homeQuestions?.[
                                        entry[0] as keyof homeQuestionsInterface
                                      ] &&
                                      touched?.homeQuestions?.[
                                        entry[0] as keyof homeQuestionsInterface
                                      ] ? (
                                        <div className="text-xs text-red-600">
                                          {
                                            errors?.homeQuestions?.[
                                              entry[0] as keyof homeQuestionsInterface
                                            ]
                                          }
                                        </div>
                                      ) : (
                                        <div className="mt-4"></div>
                                      )}
                                    </DropdownFormik>
                                    {/* <DropdownFormik
                                      key={entry[1].title as Key}
                                      labelText={entry[1].title}
                                      val={values.homeQuestions[entry[0]]}
                                      forNameId={`homeQuestions[${entry[0]}]`}
                                      selectArray={entry[1].values}
                                      exposes={
                                        entry[1].exposes ? entry[1].exposes : ""
                                      }
                                      path={`homeQuestions.${entry[0]}`}
                                    >
                                      {errors?.homeQuestions?.[
                                        entry[0] as keyof homeQuestionsInterface
                                      ] &&
                                      touched?.homeQuestions?.[
                                        entry[0] as keyof homeQuestionsInterface
                                      ] ? (
                                        <div className="text-xs text-red-600">
                                          {
                                            errors?.homeQuestions?.[
                                              entry[0] as keyof homeQuestionsInterface
                                            ]
                                          }
                                        </div>
                                      ) : (
                                        <div className="mt-4">
                                        </div>
                                      )}
                                    </DropdownFormik> */}
                                  </>
                                ) : (
                                  <>
                                    <div>{entry[0]}</div>
                                  </>
                                )
                              ) : (
                                <div>CHECKBOX</div>
                              )}
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
