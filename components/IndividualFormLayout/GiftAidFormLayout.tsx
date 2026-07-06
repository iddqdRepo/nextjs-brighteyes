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
    <FieldSet legendText="Gift Aid declaration">
      <CheckboxGiftAidFormik />
    </FieldSet>
  );
};

export const LegalAgreementSection = () => {
  return (
    <FieldSet legendText="Important information">
      <ul className="flex flex-col">
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          You can cancel this declaration at any time by notifying Bright Eyes.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          If your circumstances change and you no longer pay enough Income Tax
          or Capital Gains Tax to cover the Gift Aid claimed on your donations,
          please notify Bright Eyes.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Please notify Bright Eyes if you change your name or address.
        </li>
      </ul>
    </FieldSet>
  );
};
