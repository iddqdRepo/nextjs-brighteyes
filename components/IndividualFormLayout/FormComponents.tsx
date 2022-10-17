import { clsx } from "clsx";
import { Field } from "formik";
import React from "react";
import {
  ivAboutQuestionsInterface,
  ivDogMatchingQuestionsInterface,
  ivCatMatchingQuestionsInterface,
  ivHomeQuestionsInterface,
  ivDogQuestionsInterface,
  ivCatQuestionsInterface,
  ivHearAboutUsInfoInterface,
  AdoptionInitialValuesInterface,
} from "../../interfaces/adoptionInitialValuesInterface";
import { GiftAidInitialValuesInterface } from "../../interfaces/giftAidInitialValuesInterface";

export const Label = ({
  text,
  hFor,
  classN,
}: {
  text: string;
  hFor: string;
  classN?: string;
}) => {
  return (
    <label
      htmlFor={hFor}
      className={clsx(
        "block mb-2 w-48 text-center h-fit text-sm font-medium font-poppins text-gray-900 ",
        classN
      )}
    >
      {text}
    </label>
  );
};

export function FieldSet({
  legendText,
  children,
}: {
  legendText?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col items-center w-full p-3 mb-10 border border-gray-300 border-solid">
      <legend className="text-sm">{legendText}</legend>
      <div className="flex flex-wrap justify-center w-full">{children}</div>
    </fieldset>
  );
}
export const InputTextFormik = ({
  labelText,
  forNameId,
  val,
  classN,
  type,
  children,
}: {
  labelText: string;
  val: string;
  forNameId: string;
  classN?: string;
  type?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
      <Label text={labelText} hFor={val} />

      <Field
        className={clsx(
          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 ",
          classN
        )}
        name={forNameId}
        type={type && type}
      />
      {children}
    </div>
  );
};

export const ErrorFormik = ({
  err,
  touch,
  field,
  parent,
}: {
  err: any;
  touch: any;
  field:
    | keyof ivAboutQuestionsInterface
    | keyof ivDogMatchingQuestionsInterface
    | keyof ivCatMatchingQuestionsInterface
    | keyof ivHomeQuestionsInterface
    | keyof ivDogQuestionsInterface
    | keyof ivCatQuestionsInterface
    | keyof ivHearAboutUsInfoInterface;
  parent:
    | keyof AdoptionInitialValuesInterface
    | keyof GiftAidInitialValuesInterface;
}) => {
  return (
    <>
      {err?.[parent]?.[field] && touch?.[parent]?.[field] ? (
        <div className="text-xs text-red-600">{err?.[parent]?.[field]}</div>
      ) : (
        <div className="mt-4"></div>
      )}
    </>
  );
};
