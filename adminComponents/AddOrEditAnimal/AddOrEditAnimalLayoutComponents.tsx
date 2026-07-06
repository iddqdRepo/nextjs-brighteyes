import clsx from "clsx";
import { Field } from "formik";
import { Label } from "../../components/IndividualFormLayout/CommonFormComponents";
import React from "react";

//Field wrappers keep the form-field hook class the Cypress specs iterate
//over. Pass wrapperClassN="" to let a grid cell control the width instead of
//the default fixed sm:w-56.
export const InputOrTextArea = ({
  labelText,
  labelHForAndName,
  children,
  labelClassN,
  fieldClassN,
  wrapperClassN,
  fieldAs,
}: {
  labelText: string;
  labelHForAndName: string;
  children: React.ReactNode;
  labelClassN?: string;
  fieldClassN?: string;
  wrapperClassN?: string;
  fieldAs?: string;
}) => {
  return (
    <div
      className={clsx(
        "form-field flex flex-col justify-end mb-4 w-full",
        wrapperClassN ?? "sm:w-56"
      )}
    >
      <Label
        text={labelText}
        hFor={labelHForAndName}
        classN={labelClassN && labelClassN}
      />

      <Field
        className={clsx(
          "border border-gray-300 bg-white text-gray-900 text-sm font-poppins rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none block w-full h-11 p-2.5 ",
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

export const DropdownField = ({
  labelText,
  labelHForAndName,
  valueArray,
  children,
  labelClassN,
  fieldClassN,
  wrapperClassN,
}: {
  labelText: string;
  labelHForAndName: string;
  valueArray: string[];
  children: React.ReactNode;
  labelClassN?: string;
  fieldClassN?: string;
  wrapperClassN?: string;
}) => {
  return (
    <div
      className={clsx(
        "form-field flex flex-col justify-end mb-4 w-full",
        wrapperClassN ?? "sm:w-56"
      )}
    >
      <Label
        text={labelText}
        hFor={labelHForAndName}
        classN={labelClassN && labelClassN}
      />

      <Field
        className={clsx(
          "border border-gray-300 bg-white text-gray-900 text-sm font-poppins rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none block w-full h-11 p-2.5 ",
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
