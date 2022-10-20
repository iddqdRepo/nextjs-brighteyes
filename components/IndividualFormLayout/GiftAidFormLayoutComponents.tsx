import { Field } from "formik";
import { Key } from "react";
import { ivAboutQuestionsInterface } from "../../interfaces/adoptionInitialValuesInterface";
import { GiftAidInitialValuesInterface } from "../../interfaces/giftAidInitialValuesInterface";
import { giftAidFormBuilder } from "../../utils/formik/giftAidFormBuilder";
import { InputTextFormik, ErrorFormik } from "./CommonFormComponents";

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
            placeholder={entry[1].placeholder}
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
