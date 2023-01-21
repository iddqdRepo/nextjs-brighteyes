import React from "react";
import { FieldSet } from "./CommonFormComponents";
import {
  GiftAidQuestionMap,
  CheckboxGiftAidFormik,
} from "./GiftAidFormLayoutComponents";

export const AboutYouSection = ({ values }: { values: any }) => {
  return (
    <FieldSet legendText="About you">
      <GiftAidQuestionMap category={"aboutQuestions"} values={values} />
    </FieldSet>
  );
};
export const GiftAidSection = () => {
  return (
    <FieldSet legendText="GiftAid">
      <CheckboxGiftAidFormik />
    </FieldSet>
  );
};

export const LegalAgreementSection = () => {
  return (
    <FieldSet legendText={"Legal Agreement"}>
      <ul className="flex flex-col ">
        <span className="mb-5 font-medium text-gray-900 font-poppins">
          Notes:
        </span>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          You can cancel this Declaration at any time by notifying Bright Eyes.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          If your circumstances change and you no pay enough income or capital
          gains tax to cover the amount claimed by Bright Eyes, please inform us
          in writing.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          If you pay tax at the higher rate, you can claim further tax relief
          via your Self Assessment tax return (currently 25p for each £1 you
          give).
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Please notify Bright Eyes if you change your name or address.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Gift Aid is linked to basic rate tax. Basic rate tax is currently 20%
          which allows charities to reclaim 25 pence on the pound.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Higher rate taxpayers can claim back the difference between basic rate
          and higher rate tax.
        </li>
      </ul>
    </FieldSet>
  );
};
