import React from "react";
import { clsx } from "clsx";
import { Field } from "formik";
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
import {
  ivAboutQuestionsVolunteerInterface,
  ivEmergencyContactInfoInterface,
  ivHealthInfoInterface,
  ivVolunteeringInfoInterface,
  ivRefereeInfoInterface,
  ivOffenderInfoInterface,
  VolunteerInitialValuesInterface,
} from "../../interfaces/volunteerInitialValuesInterface";

export const FormPageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center w-3/6">
      <div className="m-3 mt-10 text-2xl font-medium text-center text-gray-900 font-poppins">
        {title}
      </div>
    </div>
  );
};
export const FormikFormContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
        {children}
      </div>
    </div>
  );
};

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
export const InputTextAreaFormik = ({
  labelText,
  forNameId,
  val,
  classN,
  children,
}: {
  labelText: string;
  val: string;
  forNameId: string;
  classN?: string;
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
        as="textarea"
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
    | keyof ivHearAboutUsInfoInterface
    | keyof ivAboutQuestionsVolunteerInterface
    | keyof ivEmergencyContactInfoInterface
    | keyof ivHealthInfoInterface
    | keyof ivVolunteeringInfoInterface
    | keyof ivRefereeInfoInterface
    | keyof ivOffenderInfoInterface;
  parent:
    | keyof AdoptionInitialValuesInterface
    | keyof GiftAidInitialValuesInterface
    | keyof VolunteerInitialValuesInterface;
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
