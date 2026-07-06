import { ErrorMessage, Field } from "formik";
import { Key } from "react";
import { ivAboutQuestionsInterface } from "../../interfaces/adoptionInitialValuesInterface";
import { GiftAidFormInterface } from "../../interfaces/giftAidFormInterface";
import { MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT } from "../../utils/donationConstants";
import { giftAidFormBuilder } from "../../utils/formik/giftAidFormBuilder";
import {
  InputTextFieldWithLabelFormik,
  ErrorFormik,
} from "./CommonFormComponents";

export const GiftAidQuestionMap = ({
  category,
}: {
  category: keyof GiftAidFormInterface;
  values: any;
}) => {
  return giftAidFormBuilder[category] ? (
    <>
      {Object.entries(giftAidFormBuilder[category]).map((entry) => {
        let title = entry[1].title as keyof ivAboutQuestionsInterface;
        let field = entry[0] as keyof ivAboutQuestionsInterface;

        return (
          <InputTextFieldWithLabelFormik
            key={entry[0] as Key}
            labelText={title}
            forNameId={`${category}.${field}`}
            type={entry[0] === "email" ? "email" : ""}
            placeholder={entry[1].placeholder}
          >
            <ErrorFormik
              field={field}
              parent={category}
              id={"err-" + entry[0]}
            />
          </InputTextFieldWithLabelFormik>
        );
      })}
    </>
  ) : (
    <div>loading</div>
  );
};

export const CheckboxGiftAidFormik = () => {
  return (
    <div className="flex flex-col items-start justify-center mb-4 mr-2 gap-3">
      <label className="flex items-start">
        <Field
          className="mt-1"
          type="checkbox"
          name="giftAidFuture"
          value="Yes"
        />
        <span className="m-2">{giftAidFormBuilder.giftAidFuture.title}</span>
      </label>

      <label className="flex items-start">
        <Field
          className="mt-1"
          type="checkbox"
          name="giftAidPast"
          value="Yes"
        />
        <span className="m-2">{giftAidFormBuilder.giftAidPast.title}</span>
      </label>

      <ErrorMessage
        name="giftAidFuture"
        component="div"
        className="text-xs text-red-600"
      />

      <label className="flex items-start">
        <Field className="mt-1" type="checkbox" name="declarationAccepted" />
        <span className="m-2">
          {MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT}
        </span>
      </label>
      <ErrorMessage
        name="declarationAccepted"
        component="div"
        className="text-xs text-red-600"
      />
    </div>
  );
};
