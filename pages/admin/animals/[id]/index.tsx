import React from "react";
import petModel from "../../../../models/petModel";
import dbConnect from "../../../../utils/dbConnect";
import { Field, Formik } from "formik";
import {
  FormPageTitle,
  Label,
} from "../../../../components/IndividualFormLayout/CommonFormComponents";
import { PetInterface } from "../../../../interfaces/interfaces";
import { PageContainerComponent } from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";

function Index({ animal }: { animal: PetInterface[] }) {
  return (
    <AdminSidebarComponent highlighted={""}>
      <PageContainerComponent>
        <form className="flex flex-col items-center justify-center ">
          <FormPageTitle title={`Editing ${animal[0].name}'s adoption form`} />
          <Formik
            initialValues={animal[0]}
            //   validationSchema={AdoptionSchema}
            onSubmit={() => {}}
          >
            {({ values, handleSubmit }) => (
              <div className="flex justify-center w-full">
                <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
                  <div className="flex justify-center w-full p-5 md:w-3/6 md:p-0">
                    <div
                      className="bg-no-repeat bg-cover w-60 h-60 2xl:w-60 rounded-xl 2xl:h-60"
                      style={{
                        backgroundImage: `url("${animal[0].image}")`,
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text="Name" hFor="Name" />

                    <Field
                      className="border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      name="name"
                      type="text"
                      value={values.name}
                    />
                  </div>
                  {/* <InputTextFormik
                labelText="Name"
                val="Name"
                forNameId="Name"
                type="Text"
              >
                <ErrorFormik
                  err={err}
                  touch={touch}
                  field={field}
                  parent={category}
                  id={"err-" + entry[0]}
                />
              </InputTextFormik> */}
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text={"Type"} hFor={"Type"} />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      }
                      name="type"
                      as="select"
                    >
                      <option value={""}>Select</option>
                      <option value={"Dog"}>Dog</option>
                      <option value={"Cat"}>Cat</option>
                    </Field>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                      <Label text="Age" hFor="Age" classN="w-12" />
                      <Field
                        className="border w-12 border-gray-300 text-gray-900 text-xs font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-11 p-2.5 "
                        name="age"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                      <Label
                        text={"Years/Months"}
                        hFor={"yearsOrMonths"}
                        classN="w-28"
                      />
                      <Field
                        className={
                          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-11 p-2.5 "
                        }
                        name="yearsOrMonths"
                        as="select"
                      >
                        <option value={""}>Select</option>
                        <option value={"Months"}>Months</option>
                        <option value={"Years"}>Years</option>
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text={"Sex"} hFor={"Sex"} />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      }
                      name="sex"
                      as="select"
                    >
                      <option value={""}>Select</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </Field>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text={"Size"} hFor={"Size"} />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      }
                      name="size"
                      as="select"
                    >
                      <option value={""}>Select</option>
                      <option value={"Small"}>Small</option>
                      <option value={"Medium"}>Medium</option>
                      <option value={"Large"}>Large</option>
                      <option value={"Giant"}>Giant</option>
                    </Field>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label
                      text={"Suitable for children"}
                      hFor={"Suitable for children"}
                    />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      }
                      name="suitableForChildren"
                      as="select"
                    >
                      <option value={""}>Select</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </Field>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text={"adopted"} hFor={"adopted"} />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
                      }
                      name="adopted"
                      as="select"
                    >
                      <option value={""}>Select</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </Field>
                  </div>
                  <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
                    <Label text={"Description"} hFor={"desc"} />
                    <Field
                      className={
                        "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 h-32 p-2.5 "
                      }
                      name="desc"
                      as="textarea"
                    ></Field>
                  </div>
                  <button
                    type="submit"
                    className="flex p-3 border mb-2 mt-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Update {animal[0].name}
                  </button>
                  {/* <pre>
                {JSON.stringify(
                  values,
                  (key, value) => {
                    if (key != "image") {
                      return value;
                    }
                  },
                  1
                )}
              </pre> */}
                </div>
              </div>
            )}
          </Formik>
        </form>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find();
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    console.log(obj._id.toString());
    return {
      params: {
        id: obj._id.toString().trim(),
      },
    };
  });

  return {
    paths, //paths which is the same as paths:paths
    fallback: false, // false = if a user tries to visit a route that doesnt exist, it shows a 404 page
  };
}

export async function getStaticProps(context: { params: { id: any } }) {
  dbConnect();
  const id = context.params.id;
  console.log("id = ", context.params.id);
  // Find and return the page to be rendered (in this case, with the correct slug that we used to build the paths)
  const dataTemp = await petModel.find({ _id: id }).lean();
  const animal = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.name) {
      doc.name = doc.name.trim();
    }
    if (doc.createdAt) {
      doc.createdAt = doc.createdAt.toString();
    }
    if (doc.updatedAt) {
      doc.updatedAt = doc.updatedAt.toString();
    }
    return doc;
  });

  return {
    props: {
      animal,
    },
    revalidate: 10, // In seconds
  };
}
