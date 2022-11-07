import clsx from "clsx";
import { Field } from "formik";
import { Label } from "../../components/IndividualFormLayout/CommonFormComponents";
import { PetInterface } from "../../interfaces/interfaces";
import Resizer from "react-image-file-resizer";
import React from "react";

let onFileResize = (file: Blob, setter: any) => {
  //^compress the file then store in base64
  return new Promise((resolve) => {
    //^ Wait until the image is compressed before storing

    Resizer.imageFileResizer(
      file, // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        setter(uri);
        resolve(uri);
      },
      "base64" // blob or base64 default base64
    );
  });
};

export const AddOrEditAnimalErrorFormik = ({
  err,
  touch,
  field,
}: {
  err: any;
  touch: any;
  field: keyof PetInterface;
}) => {
  return (
    <>
      {err?.[field] && touch?.[field] ? (
        <div id={"err" + field} className="text-xs text-red-600">
          {err?.[field]}
        </div>
      ) : (
        <div id={"err" + field} className="mt-4"></div>
      )}
    </>
  );
};
export const InputOrTextArea = ({
  labelText,
  labelHForAndName,
  children,
  labelClassN,
  fieldClassN,
  fieldAs,
}: {
  labelText: string;
  labelHForAndName: string;
  children: React.ReactNode;
  labelClassN?: string;
  fieldClassN?: string;
  fieldAs?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
      <Label
        text={labelText}
        hFor={labelHForAndName}
        classN={labelClassN && labelClassN}
      />

      <Field
        className={clsx(
          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 ",
          fieldClassN
        )}
        name={labelHForAndName}
        type="text"
        as={fieldAs && fieldAs}
      />
      {children}
    </div>
  );
};
export const ChooseFile = ({
  labelHForAndName,
  children,
  labelClassN,
  setter,
  values,
}: {
  labelHForAndName: string;
  children: React.ReactNode;
  labelClassN?: string;
  setter: any;
  values: { [key: string]: string; image: string } | PetInterface;
}) => {
  return (
    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
      <Label
        text={"Choose a file"}
        hFor={labelHForAndName}
        classN={labelClassN && labelClassN}
      />

      <input
        type="file"
        id="file"
        accept="image/*"
        name="image"
        onChange={(e) => {
          if (e.target.files) {
            const setImage = async () => {
              //*setImage() stores the data from the promise returned from
              //*onFileResize() into values.image, otherwise it just stores {<fulfilled> data:sdfsdf}
              if (e.target.files)
                return await onFileResize(e.target.files[0], setter).then(
                  (data) => {
                    values.image = data as string;
                  }
                );
            };
            setImage();
          }
        }}
      />
      {children}
    </div>
  );
};

export const DropdownField = ({
  labelText,
  labelHForAndName,
  valueArray,
  children,
  labelClassN,
  fieldClassN,
}: {
  labelText: string;
  labelHForAndName: string;
  valueArray: string[];
  children: React.ReactNode;
  labelClassN?: string;
  fieldClassN?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
      <Label
        text={labelText}
        hFor={labelHForAndName}
        classN={labelClassN && labelClassN}
      />

      <Field
        className={clsx(
          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 ",
          fieldClassN
        )}
        name={labelHForAndName}
        as="select"
      >
        <option value={""}>Select</option>
        {valueArray.map((selectValue) => {
          return (
            <option key={selectValue} value={selectValue}>
              {selectValue}
            </option>
          );
        })}
      </Field>
      {children}
    </div>
  );
};

export let submittingButtonIcon = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2"
    >
      <svg className="w-6 h-6 animate-spin stroke-white" viewBox="0 0 256 256">
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
      <span className="text-xs font-medium text-white-500">Submitting...</span>
    </div>
  );
};

export const ShowButtonTextOnSubmit = ({
  loading,
  isSuccess,
  buttonText,
  submitHandler,
  animalName,
}: {
  loading: boolean;
  isSuccess: boolean;
  buttonText: string;
  submitHandler: any;
  animalName: string;
}) => {
  return loading ? (
    <button
      type="submit"
      className="flex p-3 border mb-2 mt-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]"
      onClick={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      {submittingButtonIcon()}
    </button>
  ) : isSuccess ? (
    <button
      type="submit"
      className="flex p-3 border mb-2 mt-2 rounded-lg w-56 bg-[#8B3479] opacity-50 cursor-not-allowed text-white justify-center hover:bg-[#398092]"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {`Submitted ${animalName}`}
    </button>
  ) : (
    <button
      type="submit"
      className="flex p-3 border mb-2 mt-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]"
      onClick={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      {buttonText}
    </button>
  );
};
