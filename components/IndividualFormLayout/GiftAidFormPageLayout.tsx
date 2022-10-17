import { Field } from "formik";
import React, { Key } from "react";
import { ivAboutQuestionsInterface } from "../../interfaces/adoptionInitialValuesInterface";
import { GiftAidInitialValuesInterface } from "../../interfaces/giftAidInitialValuesInterface";
import { giftAidFormBuilder } from "../../utils/formik/giftAidFormBuilder";
import { InputTextFormik, ErrorFormik, FieldSet } from "./FormComponents";

export const QuestionsMap = ({
  category,
  values,
  err,
  touch,
}: {
  category: keyof GiftAidInitialValuesInterface;
  values: any;
  err: any;
  touch: any;
}) => {
  return giftAidFormBuilder[category] ? (
    <>
      {Object.entries(giftAidFormBuilder[category]).map((entry) => {
        let title = entry[1].title as keyof ivAboutQuestionsInterface;
        let field = entry[0] as keyof ivAboutQuestionsInterface;

        return (
          <InputTextFormik
            key={entry[0] as Key}
            labelText={title}
            val={values[category][field]}
            forNameId={`${category}.${field}`}
            type={entry[0] === "email" ? "email" : ""}
          >
            <ErrorFormik
              err={err}
              touch={touch}
              field={field}
              parent={category}
            />
          </InputTextFormik>
        );
      })}
    </>
  ) : (
    <div>loading</div>
  );
};

export const CheckboxGiftAidFormik = () => {
  return (
    <div className="flex flex-col items-start justify-center mb-4 mr-2">
      <label>
        <Field type="checkbox" name={`giftAidFuture`} value="Yes" />
        <span className="m-2">{giftAidFormBuilder.giftAidFuture.title}</span>
      </label>

      <label>
        <Field type="checkbox" name={`giftAidPast`} value="Yes" />
        <span className="m-2">{giftAidFormBuilder.giftAidPast.title}</span>
      </label>
    </div>
  );
};

export const AboutYouSection = ({
  values,
  touched,
  errors,
}: {
  values: any;
  touched: any;
  errors: any;
}) => {
  return (
    <FieldSet legendText="About you">
      <QuestionsMap
        category={"aboutQuestions"}
        values={values}
        touch={touched}
        err={errors}
      />
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
