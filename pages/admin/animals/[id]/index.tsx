import React, { useState } from "react";
import petModel from "../../../../models/petModel";
import dbConnect from "../../../../utils/dbConnect";
import { Formik } from "formik";
import {
  ErrorFormik,
  FormPageTitle,
} from "../../../../components/IndividualFormLayout/CommonFormComponents";
import { PetInterface } from "../../../../interfaces/interfaces";
import {
  AdminHeadTag,
  PageContainerComponent,
} from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";
import {
  InputOrTextArea,
  DropdownField,
  ChooseFile,
} from "../../../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayoutComponents";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { updatePet } from "../../../../routes/petRoutes";
import { ShowButtonTextOnSubmit } from "../../../../components/common/CommonComponents";

function Index({ animal }: { animal: PetInterface[] }) {
  const [resizedImage, setResizedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(`Make Edit`);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <AdminHeadTag
        title={"Edit Animal"}
        metaContent={"Admin Edit Animal, Bright Eyes"}
        linkHref={"/admin/animals/"}
      />
      <AdminSidebarComponent highlighted={""}>
        <PageContainerComponent>
          <form className="flex flex-col items-center justify-center ">
            <FormPageTitle
              title={`Editing ${animal[0].name}'s adoption form`}
            />
            <Formik
              initialValues={animal[0]}
              validationSchema={AnimalSchema}
              onSubmit={async (data) => {
                setLoading(true);
                let toPost: PetInterface = sanitizeInput(data as PetInterface);
                let successful = await updatePet(toPost);
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
              {({ values, handleSubmit }) => (
                <div className="flex justify-center w-full">
                  <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
                    <InputOrTextArea
                      labelText={"Name"}
                      labelHForAndName={"name"}
                    >
                      <ErrorFormik field={"name"} />
                    </InputOrTextArea>

                    <DropdownField
                      labelText={"Type"}
                      labelHForAndName={"type"}
                      valueArray={["Dog", "Cat"]}
                    >
                      <ErrorFormik field={"type"} />
                    </DropdownField>

                    <div className="flex">
                      <InputOrTextArea
                        labelText={"Age"}
                        labelHForAndName={"age"}
                        labelClassN="w-12"
                        fieldClassN="w-12"
                      >
                        <ErrorFormik field={"age"} />
                      </InputOrTextArea>

                      <DropdownField
                        labelText={"Years/Months"}
                        labelHForAndName={"yearsOrMonths"}
                        valueArray={["Months", "Years"]}
                        labelClassN="w-28"
                        fieldClassN="w-28"
                      >
                        <ErrorFormik field={"yearsOrMonths"} />
                      </DropdownField>
                    </div>

                    <DropdownField
                      labelText={"Sex"}
                      labelHForAndName={"sex"}
                      valueArray={["Male", "Female"]}
                    >
                      <ErrorFormik field={"sex"} />
                    </DropdownField>

                    <DropdownField
                      labelText={"Size"}
                      labelHForAndName={"size"}
                      valueArray={["Small", "Medium", "Large", "Giant"]}
                    >
                      <ErrorFormik field={"size"} />
                    </DropdownField>

                    <DropdownField
                      labelText={"Suitable for children"}
                      labelHForAndName={"suitableForChildren"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik field={"suitableForChildren"} />
                    </DropdownField>
                    <DropdownField
                      labelText={"Suitable for animals"}
                      labelHForAndName={"suitableForAnimals"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik field={"suitableForAnimals"} />
                    </DropdownField>

                    <DropdownField
                      labelText={"Adopted"}
                      labelHForAndName={"adopted"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik field={"adopted"} />
                    </DropdownField>
                    <InputOrTextArea
                      labelText={"Description"}
                      labelHForAndName="desc"
                      fieldClassN="w-64 h-32"
                      fieldAs="textarea"
                    >
                      <ErrorFormik field={"desc"} />
                    </InputOrTextArea>
                    <ChooseFile
                      labelHForAndName="image"
                      setter={setResizedImage}
                      values={values}
                    >
                      <ErrorFormik field={"desc"} />
                    </ChooseFile>
                    <div className="flex justify-center w-full p-5 md:w-3/6 md:p-0">
                      <div
                        className="bg-no-repeat bg-cover w-60 h-60 2xl:w-60 rounded-xl 2xl:h-60"
                        style={{
                          backgroundImage: `url("${
                            resizedImage ? resizedImage : values.image
                          }")`,
                        }}
                      ></div>
                    </div>
                    <ShowButtonTextOnSubmit
                      loading={loading}
                      isSuccess={isSuccess}
                      buttonText={buttonText}
                      submitHandler={handleSubmit}
                      animalName={values.name}
                    />
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
    </>
  );
}

export default Index;

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find({}, { image: 0 });
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
      },
    };
  });
  return {
    paths, //paths which is the same as paths:paths
    fallback: "blocking",
  };
}

export async function getStaticProps(context: { params: { id: any } }) {
  dbConnect();
  const id = context.params.id;
  // console.log("id = ", context.params.id);
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
    revalidate: 1,
  };
}
