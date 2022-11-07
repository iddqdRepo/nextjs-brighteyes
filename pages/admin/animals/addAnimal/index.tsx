import React, { useState } from "react";
import { Formik } from "formik";
import { FormPageTitle } from "../../../../components/IndividualFormLayout/CommonFormComponents";
import { PageContainerComponent } from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";
import {
  InputOrTextArea,
  AddOrEditAnimalErrorFormik,
  DropdownField,
  ChooseFile,
} from "../../../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayoutComponents";

import { postPet } from "../../../../routes/petRoutes";
import { PetInterface } from "../../../../interfaces/interfaces";

function Index() {
  const [resizedImage, setResizedImage] = useState("");
  console.log("iamge.len", resizedImage.length);

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

  const sanitizeInput = (data: PetInterface) => {
    let sanitizedData: PetInterface = { ...data };
    Object.entries(data).forEach(([key, value]) => {
      let newValue: string = value;
      if (key != "image") {
        newValue = value.charAt(0).toUpperCase() + value.slice(1);
        newValue = newValue.trim();
      }
      sanitizedData[key as keyof PetInterface] = newValue as string;
    });
    return sanitizedData;
  };

  return (
    <AdminSidebarComponent highlighted={""}>
      <PageContainerComponent>
        <form className="flex flex-col items-center justify-center ">
          <FormPageTitle title={`Add an animal`} />
          <Formik
            initialValues={initialValues}
            validationSchema={AnimalSchema}
            onSubmit={(data) => {
              let toPost: PetInterface = sanitizeInput(data as PetInterface);
              postPet(toPost);
            }}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <div className="flex justify-center w-full">
                <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
                  <InputOrTextArea labelText={"Name"} labelHForAndName={"name"}>
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                      <AddOrEditAnimalErrorFormik
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
                      <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
                      err={errors}
                      touch={touched}
                      field={"breed"}
                    />
                  </InputOrTextArea>
                  <DropdownField
                    labelText={"Sex"}
                    labelHForAndName={"sex"}
                    valueArray={["Male", "Female"]}
                  >
                    <AddOrEditAnimalErrorFormik
                      err={errors}
                      touch={touched}
                      field={"sex"}
                    />
                  </DropdownField>

                  <DropdownField
                    labelText={"Size"}
                    labelHForAndName={"size"}
                    valueArray={["Small", "Medium", "Large", "Giant"]}
                  >
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                    <AddOrEditAnimalErrorFormik
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
                  <button
                    type="submit"
                    className="flex p-3 border mb-2 mt-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Add Animal
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
                  {/* <pre>{JSON.stringify(values, null, 1)}</pre> */}
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
