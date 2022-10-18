import { Field } from "formik";
import React from "react";
import { AdoptionInitialValuesInterface } from "../../interfaces/adoptionInitialValuesInterface";
import { Label } from "./FormComponents";

export const CheckboxPlanningFormik = ({
  stateField,
}: {
  stateField: AdoptionInitialValuesInterface;
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4 mr-2">
      <Label
        text={"Are you planning any of the following in the next 6 months"}
        hFor={""}
        classN="w-60"
      />
      <label>
        <Field
          type="checkbox"
          name={`homeQuestions["planning>baby"]`}
          value="Yes"
        />
        {stateField.homeQuestions["planning>baby"].title}
      </label>
      <label>
        <Field
          type="checkbox"
          name={`homeQuestions["planning>moving"]`}
          value="Yes"
        />
        {stateField.homeQuestions["planning>moving"].title}
      </label>
      <label>
        <Field
          type="checkbox"
          name={`homeQuestions["planning>workHoursChange"]`}
          value="Yes"
        />
        {stateField.homeQuestions["planning>workHoursChange"].title}
      </label>
      <label>
        <Field
          type="checkbox"
          name={`homeQuestions["planning>holiday"]`}
          value="Yes"
        />
        {stateField.homeQuestions["planning>holiday"].title}
      </label>
    </div>
  );
};
