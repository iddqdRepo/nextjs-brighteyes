import { Field } from "formik";
import React from "react";
import { AdoptionInitialValuesInterface } from "../../interfaces/adoptionInitialValuesInterface";
import { Label } from "./CommonFormComponents";

const PLANNING_FIELDS = [
  "planning>baby",
  "planning>moving",
  "planning>workHoursChange",
  "planning>holiday",
] as const;

export const CheckboxPlanningFormik = ({
  stateField,
}: {
  stateField: AdoptionInitialValuesInterface;
}) => {
  return (
    <div className="flex w-full flex-col mb-4">
      <Label
        text={"Are you planning any of the following in the next 6 months?"}
        hFor={""}
        classN="block mb-2 text-sm font-medium font-poppins text-gray-800 text-left"
      />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PLANNING_FIELDS.map((field) => (
          <label
            key={field}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition hover:border-brand font-poppins"
          >
            <Field
              type="checkbox"
              name={`homeQuestions["${field}"]`}
              value="Yes"
              className="h-4 w-4 accent-brand"
            />
            {stateField.homeQuestions[field].title}
          </label>
        ))}
      </div>
    </div>
  );
};
