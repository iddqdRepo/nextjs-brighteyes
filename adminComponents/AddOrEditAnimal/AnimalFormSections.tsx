import React from "react";
import { FormikProps } from "formik";
import { ErrorFormik } from "../../components/IndividualFormLayout/CommonFormComponents";
import { AdminCard } from "../commonAdminComponents";
import { PetInterface } from "../../interfaces/interfaces";
import {
  DropdownField,
  InputOrTextArea,
} from "./AddOrEditAnimalLayoutComponents";
import { PetPhotoField } from "./PetPhotoField";

//The add and edit animal pages share these sections; only the Formik shell
//around them differs.
export const AnimalFormSections = ({
  values,
  setFieldValue,
}: {
  values: PetInterface;
  setFieldValue: FormikProps<PetInterface>["setFieldValue"];
}) => {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <AdminCard title="About the animal">
        <div className="grid gap-x-4 sm:grid-cols-2">
          <InputOrTextArea
            labelText={"Name"}
            labelHForAndName={"name"}
            wrapperClassN=""
          >
            <ErrorFormik field={"name"} />
          </InputOrTextArea>
          <DropdownField
            labelText={"Type"}
            labelHForAndName={"type"}
            valueArray={["Dog", "Cat"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"type"} />
          </DropdownField>
          <InputOrTextArea
            labelText={"Breed"}
            labelHForAndName={"breed"}
            wrapperClassN=""
          >
            <ErrorFormik field={"breed"} />
          </InputOrTextArea>
          <DropdownField
            labelText={"Sex"}
            labelHForAndName={"sex"}
            valueArray={["Male", "Female", "Mixed"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"sex"} />
          </DropdownField>
          <InputOrTextArea
            labelText={"Age"}
            labelHForAndName={"age"}
            wrapperClassN=""
          >
            <ErrorFormik field={"age"} />
          </InputOrTextArea>
          <DropdownField
            labelText={"Years/Months"}
            labelHForAndName={"yearsOrMonths"}
            valueArray={["Months", "Years"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"yearsOrMonths"} />
          </DropdownField>
          <DropdownField
            labelText={"Size"}
            labelHForAndName={"size"}
            valueArray={["Small", "Medium", "Large", "Giant"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"size"} />
          </DropdownField>
          <DropdownField
            labelText={"Adopted"}
            labelHForAndName={"adopted"}
            valueArray={["Yes", "No"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"adopted"} />
          </DropdownField>
          <DropdownField
            labelText={"Suitable for children"}
            labelHForAndName={"suitableForChildren"}
            valueArray={["Yes", "No"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"suitableForChildren"} />
          </DropdownField>
          <DropdownField
            labelText={"Suitable for animals"}
            labelHForAndName={"suitableForAnimals"}
            valueArray={["Yes", "No"]}
            wrapperClassN=""
          >
            <ErrorFormik field={"suitableForAnimals"} />
          </DropdownField>
        </div>
        <InputOrTextArea
          labelText={"Description"}
          labelHForAndName="desc"
          fieldClassN="h-32"
          fieldAs="textarea"
          wrapperClassN=""
        >
          <ErrorFormik field={"desc"} />
        </InputOrTextArea>
      </AdminCard>

      <AdminCard title="Photo">
        <PetPhotoField
          image={values.image}
          petName={values.name}
          onImageChange={(dataUrl) => setFieldValue("image", dataUrl)}
        />
        <ErrorFormik field={"image"} />
      </AdminCard>
    </div>
  );
};
