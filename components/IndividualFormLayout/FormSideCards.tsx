import React from "react";
import { Icon } from "@iconify/react";

//Sidebar cards shared by the Gift Aid and Volunteer form pages, matching the
//adoption form's AdoptionProcessCard / AdoptionCriteriaCard styling.

export const FormStepsCard = ({
  title,
  steps,
}: {
  title: string;
  steps: { icon: string; title: string; text: string }[];
}) => {
  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/60">
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        {title}
      </h2>
      <div className="mt-4 flex flex-col">
        {steps.map((step, index) => (
          <div key={step.title}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <Icon icon={step.icon} color="#8b3479" width="20" height="20" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 font-poppins">
                  {step.title}
                </div>
                <p className="mt-0.5 text-xs leading-5 text-gray-600 font-poppins">
                  {step.text}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="my-1.5 ml-5 h-4 border-l-2 border-dashed border-brand-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FormInfoCard = ({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: string[];
}) => {
  return (
    <div className="w-full rounded-3xl bg-cream-deep p-6">
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        {title}
      </h2>
      {intro && (
        <p className="mt-1 text-xs leading-5 text-gray-600 font-poppins">
          {intro}
        </p>
      )}
      <div className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <Icon
              className="mt-0.5 shrink-0"
              icon="charm:circle-tick"
              color="#8b3479"
              width="18"
              height="18"
            />
            <span className="text-sm font-medium leading-6 text-gray-800 font-poppins">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
