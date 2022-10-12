// import React, { useState } from "react";
// import { Formik, Form, Field, FieldArray } from "formik";

// // Here is an example of a form with an editable list.
// // Next to each input are buttons for insert and remove.
// // If the list is empty, there is a button to add an item.
// // const Index = () => (
// //   <div>
// //     <h1>Friend List</h1>
// //     <Formik
// //       initialValues={{ a: "a", b: "b" }}
// //       validateOnChange={false}
// //       validateOnBlur={false}
// //       enableReinitialize={true}
// //     >
// //       {(props) => (
// //         <Form>
// //           <fieldset className="form-group">
// //             <label>Category</label>
// //             <Field name="a" component="select">
// //               <option value="Admission">Admission</option>
// //               <option value="Class_Fee">Class Fee</option>
// //               <option value="Staff_Payment">Staff Payment</option>
// //               <option value="Other">Other</option>
// //             </Field>
// //           </fieldset>
// //           {props.values.a !== "Other" && (
// //             <fieldset className="form-group">
// //               <label>Name</label>
// //               <Field className="form-control" type="text" name="name" />
// //             </fieldset>
// //           )}
// //           <button className="btn btn-success" type="submit">
// //             Save
// //           </button>
// //           &nbsp;
// //           <button type="reset" className="btn btn-secondary">
// //             Reset
// //           </button>
// //         </Form>
// //       )}
// //     </Formik>
// //     ;
// //   </div>
// // );
// const Index = () => {
//   const [render, setRender] = useState([1]);

//   const doRender = () => {
//     console.log("DORENDEr");
//     let temp = render;
//     temp.push(1);
//     console.log(temp);
//     setRender([...temp]);
//   };

//   return (
//     <>
//       <button onClick={doRender}>RERENDER</button>
//     </>
//   );
// };

// export default Index;

// //^ paste below into adoptoionForm

// <FieldSet legendText="About you">
//                   <div className="flex ">
//                     {toShow.aboutQuestions ? (
//                       Object.entries(toShow.aboutQuestions).map((entry) => {
//                         // console.log("toShow.aboutQuestions", entry);
//                         return (
//                           <>
//                             <InputTextFormik
//                               key={entry[0] as Key}
//                               labelText={entry[1].title as Key}
//                               val={
//                                 values.aboutQuestions[
//                                   entry[0] as keyof aboutQuestionsInterface
//                                 ]
//                               }
//                               forNameId={`aboutQuestions.${entry[0]}`}
//                               type={entry[0] === "email" ? "email" : ""}
//                             >
//                               {errors?.aboutQuestions?.[
//                                 entry[0] as keyof aboutQuestionsInterface
//                               ] &&
//                               touched?.aboutQuestions?.[
//                                 entry[0] as keyof aboutQuestionsInterface
//                               ] ? (
//                                 <div className="text-xs text-red-600">
//                                   {
//                                     errors?.aboutQuestions?.[
//                                       entry[0] as keyof aboutQuestionsInterface
//                                     ]
//                                   }
//                                 </div>
//                               ) : (
//                                 <div className="mt-4"></div>
//                               )}
//                             </InputTextFormik>
//                           </>
//                         );
//                       })
//                     ) : (
//                       <div>loading</div>
//                     )}
//                   </div>
//                 </FieldSet>
//                 <FieldSet legendText={type + " Matching Questions"}>
//                   <div className="flex ">
//                     {type === "Dog" ? (
//                       toShow.dogMatchingQuestions ? (
//                         Object.entries(toShow.dogMatchingQuestions).map(
//                           (entry) => {
//                             const value =
//                               entry[1] as keyof dogMatchingQuestionsInterface;
//                             return (
//                               <>
//                                 {entry[1].type === "text" ? (
//                                   <>
//                                     {/* {console.log("entry type===text", entry)} */}
//                                     <InputTextFormik
//                                       key={entry[0] as Key}
//                                       labelText={entry[1].title as Key}
//                                       val={
//                                         values.dogMatchingQuestions[
//                                           entry[0] as keyof dogMatchingQuestionsInterface
//                                         ]
//                                       }
//                                       forNameId={`dogMatchingQuestions.${entry[0]}`}
//                                       type={entry[0] === "email" ? "email" : ""}
//                                     >
//                                       {errors?.dogMatchingQuestions?.[
//                                         entry[0] as keyof dogMatchingQuestionsInterface
//                                       ] &&
//                                       touched?.dogMatchingQuestions?.[
//                                         entry[0] as keyof dogMatchingQuestionsInterface
//                                       ] ? (
//                                         <div className="text-xs text-red-600">
//                                           {
//                                             errors?.dogMatchingQuestions?.[
//                                               entry[0] as keyof dogMatchingQuestionsInterface
//                                             ]
//                                           }
//                                         </div>
//                                       ) : (
//                                         <div className="mt-4"></div>
//                                       )}
//                                     </InputTextFormik>
//                                   </>
//                                 ) : (
//                                   <>
//                                     {/* {console.log("entry type!==text", entry)} */}

//                                     <DropdownFormik
//                                       key={entry[1].title as Key}
//                                       labelText={entry[1].title}
//                                       val={values.dogMatchingQuestions[value]}
//                                       forNameId={`dogMatchingQuestions[${entry[0]}]`}
//                                       selectArray={entry[1].values}
//                                     >
//                                       {errors?.dogMatchingQuestions?.[
//                                         entry[0] as keyof dogMatchingQuestionsInterface
//                                       ] &&
//                                       touched?.dogMatchingQuestions?.[
//                                         entry[0] as keyof dogMatchingQuestionsInterface
//                                       ] ? (
//                                         <div className="text-xs text-red-600">
//                                           {
//                                             errors?.dogMatchingQuestions?.[
//                                               entry[0] as keyof dogMatchingQuestionsInterface
//                                             ]
//                                           }
//                                         </div>
//                                       ) : (
//                                         <div className="mt-4"></div>
//                                       )}
//                                     </DropdownFormik>
//                                   </>
//                                 )}
//                               </>
//                             );
//                           }
//                         )
//                       ) : (
//                         <div>loading</div>
//                       )
//                     ) : toShow.catMatchingQuestions ? (
//                       Object.entries(toShow.catMatchingQuestions).map(
//                         (entry) => {
//                           const value =
//                             entry[1] as keyof catMatchingQuestionsInterface;
//                           return (
//                             <>
//                               {entry[1].type === "text" ? (
//                                 <>
//                                   {/* {console.log("entry type===text", entry)} */}
//                                   <InputTextFormik
//                                     key={entry[0] as Key}
//                                     labelText={entry[1].title as Key}
//                                     val={
//                                       values.catMatchingQuestions[
//                                         entry[0] as keyof catMatchingQuestionsInterface
//                                       ]
//                                     }
//                                     forNameId={`catMatchingQuestions.${entry[0]}`}
//                                     type={entry[0] === "email" ? "email" : ""}
//                                   >
//                                     {errors?.catMatchingQuestions?.[
//                                       entry[0] as keyof catMatchingQuestionsInterface
//                                     ] &&
//                                     touched?.catMatchingQuestions?.[
//                                       entry[0] as keyof catMatchingQuestionsInterface
//                                     ] ? (
//                                       <div className="text-xs text-red-600">
//                                         {
//                                           errors?.catMatchingQuestions?.[
//                                             entry[0] as keyof catMatchingQuestionsInterface
//                                           ]
//                                         }
//                                       </div>
//                                     ) : (
//                                       <div className="mt-4"></div>
//                                     )}
//                                   </InputTextFormik>
//                                 </>
//                               ) : (
//                                 <>
//                                   {/* {console.log("entry type!==text", entry)} */}

//                                   <DropdownFormik
//                                     key={entry[1].title as Key}
//                                     labelText={entry[1].title}
//                                     val={values.catMatchingQuestions[value]}
//                                     forNameId={`catMatchingQuestions[${entry[0]}]`}
//                                     selectArray={entry[1].values}
//                                   >
//                                     {errors?.catMatchingQuestions?.[
//                                       entry[0] as keyof catMatchingQuestionsInterface
//                                     ] &&
//                                     touched?.catMatchingQuestions?.[
//                                       entry[0] as keyof catMatchingQuestionsInterface
//                                     ] ? (
//                                       <div className="text-xs text-red-600">
//                                         {
//                                           errors?.catMatchingQuestions?.[
//                                             entry[0] as keyof catMatchingQuestionsInterface
//                                           ]
//                                         }
//                                       </div>
//                                     ) : (
//                                       <div className="mt-4"></div>
//                                     )}
//                                   </DropdownFormik>
//                                 </>
//                               )}
//                             </>
//                           );
//                         }
//                       )
//                     ) : (
//                       <div>loading</div>
//                     )}
//                   </div>
//                 </FieldSet>
