import React, { useState } from "react";
import { Formik } from "formik";
import {
  ErrorFormik,
  FormPageTitle,
} from "../../../../components/IndividualFormLayout/CommonFormComponents";
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

import { postPet } from "../../../../routes/petRoutes";
import { PetInterface } from "../../../../interfaces/interfaces";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { ShowButtonTextOnSubmit } from "../../../../components/common/CommonComponents";

function Index() {
  const [resizedImage, setResizedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add Animal");
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues = {
    adopted: "",
    age: "",
    breed: "",
    desc: "",
    image: "",
    name: "",
    sex: "",
    size: "",
    suitableForAnimals: "",
    suitableForChildren: "",
    type: "",
    yearsOrMonths: "",
  };

  return (
    <>
      <AdminHeadTag
        title={"Add Animal"}
        metaContent={"Admin Add Animal, Bright Eyes"}
        linkHref={"/admin/animals/addAnimal"}
      />
      <AdminSidebarComponent highlighted={""}>
        <PageContainerComponent>
          <form className="flex flex-col items-center justify-center ">
            <FormPageTitle title={`Add an animal`} />
            <Formik
              initialValues={initialValues}
              validationSchema={AnimalSchema}
              onSubmit={async (data) => {
                setLoading(true);

                let toPost: PetInterface = sanitizeInput(data as PetInterface);
                let successful = await postPet(toPost);
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
              {({ values, errors, touched, handleSubmit }) => (
                <div className="flex justify-center w-full">
                  <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
                    <InputOrTextArea
                      labelText={"Name"}
                      labelHForAndName={"name"}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"name"}
                      />
                    </InputOrTextArea>

                    <DropdownField
                      labelText={"Type"}
                      labelHForAndName={"type"}
                      valueArray={["Dog", "Cat"]}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"type"}
                      />
                    </DropdownField>

                    <div className="flex">
                      <InputOrTextArea
                        labelText={"Age"}
                        labelHForAndName={"age"}
                        labelClassN="w-12"
                        fieldClassN="w-12"
                      >
                        <ErrorFormik
                          err={errors}
                          touch={touched}
                          field={"age"}
                        />
                      </InputOrTextArea>

                      <DropdownField
                        labelText={"Years/Months"}
                        labelHForAndName={"yearsOrMonths"}
                        valueArray={["Months", "Years"]}
                        labelClassN="w-28"
                        fieldClassN="w-28"
                      >
                        <ErrorFormik
                          err={errors}
                          touch={touched}
                          field={"yearsOrMonths"}
                        />
                      </DropdownField>
                    </div>
                    <InputOrTextArea
                      labelText={"Breed"}
                      labelHForAndName={"breed"}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"breed"}
                      />
                    </InputOrTextArea>
                    <DropdownField
                      labelText={"Sex"}
                      labelHForAndName={"sex"}
                      valueArray={["Male", "Female", "Mixed"]}
                    >
                      <ErrorFormik err={errors} touch={touched} field={"sex"} />
                    </DropdownField>

                    <DropdownField
                      labelText={"Size"}
                      labelHForAndName={"size"}
                      valueArray={["Small", "Medium", "Large", "Giant"]}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"size"}
                      />
                    </DropdownField>

                    <DropdownField
                      labelText={"Suitable for children"}
                      labelHForAndName={"suitableForChildren"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"suitableForChildren"}
                      />
                    </DropdownField>
                    <DropdownField
                      labelText={"Suitable for animals"}
                      labelHForAndName={"suitableForAnimals"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"suitableForAnimals"}
                      />
                    </DropdownField>

                    <DropdownField
                      labelText={"Adopted"}
                      labelHForAndName={"adopted"}
                      valueArray={["Yes", "No"]}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"adopted"}
                      />
                    </DropdownField>
                    <InputOrTextArea
                      labelText={"Description"}
                      labelHForAndName="desc"
                      fieldClassN="w-64 h-32"
                      fieldAs="textarea"
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"desc"}
                      />
                    </InputOrTextArea>
                    <ChooseFile
                      labelHForAndName="image"
                      setter={setResizedImage}
                      values={values}
                    >
                      <ErrorFormik
                        err={errors}
                        touch={touched}
                        field={"desc"}
                      />
                    </ChooseFile>
                    <div className="flex justify-center w-full p-5 md:w-3/6 md:p-0">
                      <div
                        className="bg-no-repeat bg-cover w-60 h-60 2xl:w-60 rounded-xl 2xl:h-60"
                        style={{
                          backgroundImage: `url("${resizedImage}")`,
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
                    {/* <pre>{JSON.stringify(values, null, 1)}</pre> */}
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
