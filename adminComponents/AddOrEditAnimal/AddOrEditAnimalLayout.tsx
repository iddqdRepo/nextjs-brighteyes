import { useState } from "react";
import { ShowButtonTextOnSubmit } from "../../components/common/CommonComponents";
import {
  InputTextFieldWithLabelFormik,
  ErrorFormik,
  DropdownFieldFormik,
  InputTextAreaFormik,
  ChooseFile,
} from "../../components/IndividualFormLayout/CommonFormComponents";
import { PetInterface } from "../../interfaces/interfaces";

export const AddOrEditAnimalFormSection = ({
  isSuccess,
  buttonText,
  loading,
  handleSubmit,
  values,
}: {
  isSuccess: boolean;
  buttonText: string;
  loading: boolean;
  handleSubmit: any;
  values: PetInterface;
}) => {
  const [resizedImage, setResizedImage] = useState("");

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
        <InputTextFieldWithLabelFormik labelText={"Name"} forNameId={"name"}>
          <ErrorFormik field={"name"} />
        </InputTextFieldWithLabelFormik>
        <DropdownFieldFormik
          labelText={"Type"}
          labelHForAndName={"type"}
          valueArray={["Dog", "Cat"]}
        >
          <ErrorFormik field={"type"} />
        </DropdownFieldFormik>

        <div className="flex">
          <InputTextFieldWithLabelFormik
            labelText={"Age"}
            forNameId={"age"}
            labelClassN="w-12"
          >
            <ErrorFormik field={"age"} />
          </InputTextFieldWithLabelFormik>

          <DropdownFieldFormik
            labelText={"Years/Months"}
            labelHForAndName={"yearsOrMonths"}
            valueArray={["Months", "Years"]}
            labelClassN="w-28"
            fieldClassN="w-28"
          >
            <ErrorFormik field={"yearsOrMonths"} />
          </DropdownFieldFormik>
        </div>
        <InputTextFieldWithLabelFormik labelText={"Breed"} forNameId={"breed"}>
          <ErrorFormik field={"breed"} />
        </InputTextFieldWithLabelFormik>
        <DropdownFieldFormik
          labelText={"Sex"}
          labelHForAndName={"sex"}
          valueArray={["Male", "Female", "Mixed"]}
        >
          <ErrorFormik field={"sex"} />
        </DropdownFieldFormik>

        <DropdownFieldFormik
          labelText={"Size"}
          labelHForAndName={"size"}
          valueArray={["Small", "Medium", "Large", "Giant"]}
        >
          <ErrorFormik field={"size"} />
        </DropdownFieldFormik>

        <DropdownFieldFormik
          labelText={"Suitable for children"}
          labelHForAndName={"suitableForChildren"}
          valueArray={["Yes", "No"]}
        >
          <ErrorFormik field={"suitableForChildren"} />
        </DropdownFieldFormik>
        <DropdownFieldFormik
          labelText={"Suitable for animals"}
          labelHForAndName={"suitableForAnimals"}
          valueArray={["Yes", "No"]}
        >
          <ErrorFormik field={"suitableForAnimals"} />
        </DropdownFieldFormik>

        <DropdownFieldFormik
          labelText={"Adopted"}
          labelHForAndName={"adopted"}
          valueArray={["Yes", "No"]}
        >
          <ErrorFormik field={"adopted"} />
        </DropdownFieldFormik>

        <InputTextAreaFormik labelText={"Description"} forNameId="desc">
          <ErrorFormik field={"desc"} />
        </InputTextAreaFormik>
        <ChooseFile
          labelHForAndName="image"
          setter={setResizedImage}
          values={values}
        >
          <ErrorFormik field={"image"} />
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
      </div>
    </div>
  );
};
