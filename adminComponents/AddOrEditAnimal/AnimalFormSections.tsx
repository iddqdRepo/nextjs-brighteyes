import React, { useState } from "react";
import { FormikProps } from "formik";
import { Icon } from "@iconify/react";
import { ErrorFormik } from "../../components/IndividualFormLayout/CommonFormComponents";
import { AdminCard } from "../commonAdminComponents";
import { PetInterface } from "../../interfaces/interfaces";
import {
  DropdownField,
  InputOrTextArea,
} from "./AddOrEditAnimalLayoutComponents";
import { PetPhotoField } from "./PetPhotoField";
import { TRAIT_OPTIONS, writePetDescription } from "../../utils/petDescription";

//Trait chips + a "Write it for me" button that drafts the description from
//the form fields, for staff who find a blank textarea intimidating.
const DescriptionHelper = ({
  values,
  setFieldValue,
}: {
  values: PetInterface;
  setFieldValue: FormikProps<PetInterface>["setFieldValue"];
}) => {
  const [traits, setTraits] = useState<string[]>([]);
  const [variant, setVariant] = useState(0);

  const toggleTrait = (trait: string) => {
    setTraits(
      traits.includes(trait)
        ? traits.filter((t) => t !== trait)
        : [...traits, trait]
    );
  };

  return (
    <div className="mb-4 rounded-xl border border-dashed border-brand/40 bg-brand-50/50 p-4">
      <p className="text-sm font-semibold text-gray-800 font-poppins">
        Stuck for words?
      </p>
      <p className="mt-0.5 text-xs text-gray-600 font-poppins">
        Tick anything that describes them, then let us write a first draft. You
        can change it however you like afterwards.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {TRAIT_OPTIONS.map((trait) => (
          <button
            type="button"
            key={trait}
            onClick={() => toggleTrait(trait)}
            className={
              traits.includes(trait)
                ? "rounded-full border border-brand bg-brand px-3 py-1.5 text-xs font-medium text-white font-poppins"
                : "rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-brand hover:text-brand font-poppins"
            }
          >
            {trait}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setFieldValue("desc", writePetDescription(values, traits, variant));
          setVariant(variant + 1);
        }}
        className="mt-3 flex items-center gap-1.5 rounded-full border border-brand bg-white px-4 py-2 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white font-poppins"
      >
        <Icon icon="akar-icons:pencil" width="14" height="14" />
        {variant === 0 ? "Write it for me" : "Write it differently"}
      </button>
    </div>
  );
};

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
            valueArray={["Male", "Female"]}
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
        <DescriptionHelper values={values} setFieldValue={setFieldValue} />
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
