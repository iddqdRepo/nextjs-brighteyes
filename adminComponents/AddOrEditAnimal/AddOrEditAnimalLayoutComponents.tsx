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
  values: { [key: string]: string; image: string };
}) => {
  console.log("choosefile values =", values);
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
