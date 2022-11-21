import React, { Key } from "react";
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
import {
  ContactUsFormInterface,
  PetInterface,
} from "../../interfaces/interfaces";

export const FormPageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center w-10/12 lg:w-3/6 ">
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
      className={
        classN
          ? classN
          : "block mb-2 w-48 text-center h-fit text-sm font-medium font-poppins text-gray-900"
      }
    >
      {text}
    </label>
  );
};

export function FieldSet({
  legendText,
  children,
  id,
}: {
  legendText?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <fieldset
      id={id}
      className="flex flex-col items-center w-full p-3 mb-10 border border-gray-300 border-solid"
    >
      <legend className="text-sm">{legendText}</legend>
      <div className="flex flex-wrap justify-center w-full">{children}</div>
    </fieldset>
  );
}
export const InputTextFormik = ({
  labelText,
  forNameId,
  val,
  labelClassN,
  labelLeftAligned,
  classN,
  type,
  children,
  placeholder,
}: {
  labelText: string;
  val: string;
  forNameId: string;
  classN?: string;
  labelClassN?: string;
  type?: string;
  children: React.ReactNode;
  placeholder?: string;
  labelLeftAligned?: boolean;
}) => {
  return (
    <div
      className={
        labelLeftAligned
          ? "flex flex-col items-left justify-end mb-4 ml-1 mr-1"
          : "flex flex-col items-center justify-end mb-4 ml-1 mr-1"
      }
    >
      <Label text={labelText} hFor={val} classN={labelClassN} />

      <Field
        className={clsx(
          "border border-gray-300 text-gray-900 text-xs font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 ",
          classN
        )}
        name={forNameId}
        type={type && type}
        placeholder={placeholder && placeholder}
      />
      {children}
    </div>
  );
};
export const InputTextAreaFormik = ({
  labelText,
  forNameId,
  val,
  labelclassN,
  fieldclassN,
  children,
}: {
  labelText: string;
  val: string;
  forNameId: string;
  labelclassN?: string;
  fieldclassN?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Label text={labelText} hFor={val} classN={labelclassN} />

      <Field
        className={
          fieldclassN
            ? fieldclassN
            : "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
        }
        name={forNameId}
        as="textarea"
      />
      {children}
    </>
  );
};

export const ErrorFormik = ({
  err,
  touch,
  field,
  parent,
  id,
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
    | keyof ivOffenderInfoInterface
    | keyof ContactUsFormInterface
    | keyof PetInterface;
  parent?:
    | keyof AdoptionInitialValuesInterface
    | keyof GiftAidInitialValuesInterface
    | keyof VolunteerInitialValuesInterface;
  id?: string;
}) => {
  //If there is a parent (aboutQuestions) && field (name)
  // then use err.aboutquestions.name else just use err.name
  return (
    <>
      {parent ? (
        err?.[parent]?.[field] && touch?.[parent]?.[field] ? (
          <div id={id} className="text-xs text-red-600">
            {err?.[parent]?.[field]}
          </div>
        ) : (
          <div id={id} className="mt-4"></div>
        )
      ) : err?.[field] && touch?.[field] ? (
        <div id={"err" + field} className="text-xs text-red-600">
          {err?.[field]}
        </div>
      ) : (
        <div id={"err" + field} className="mt-4"></div>
      )}
    </>
  );
};

export const exposeOrHideFields = (
  //This is a bit of a mess to make typescript happy, needs fix.
  getState: VolunteerInitialValuesInterface | AdoptionInitialValuesInterface,
  setState: any,
  category:
    | keyof VolunteerInitialValuesInterface
    | keyof AdoptionInitialValuesInterface,
  val:
    | keyof ivHealthInfoInterface
    | keyof ivOffenderInfoInterface
    | keyof ivHomeQuestionsInterface
    | keyof ivDogQuestionsInterface
    | keyof ivCatQuestionsInterface
    | keyof ivHearAboutUsInfoInterface,
  hideOrExpose: string,
  volunteerOrAdoption: string
) => {
  let exposeVolunteer = getState as VolunteerInitialValuesInterface;
  let exposeAdoption = getState as AdoptionInitialValuesInterface;

  if (category === "healthInfo") {
    if (hideOrExpose === "expose") {
      exposeVolunteer[category][val as keyof ivHealthInfoInterface].hidden =
        false;
    } else {
      exposeVolunteer[category][val as keyof ivHealthInfoInterface].hidden =
        true;
    }
  }
  if (category === "offenderInfo") {
    if (hideOrExpose === "expose") {
      exposeVolunteer[category][val as keyof ivOffenderInfoInterface].hidden =
        false;
    } else {
      exposeVolunteer[category][val as keyof ivOffenderInfoInterface].hidden =
        true;
    }
  }
  if (category === "homeQuestions") {
    if (hideOrExpose === "expose") {
      exposeAdoption[category][val as keyof ivHomeQuestionsInterface].hidden =
        false;
    } else {
      exposeAdoption[category][val as keyof ivHomeQuestionsInterface].hidden =
        true;
    }
  }
  if (category === "dogQuestions") {
    if (hideOrExpose === "expose") {
      exposeAdoption[category][val as keyof ivDogQuestionsInterface].hidden =
        false;
    } else {
      exposeAdoption[category][val as keyof ivDogQuestionsInterface].hidden =
        true;
    }
  }
  if (category === "catQuestions") {
    if (hideOrExpose === "expose") {
      exposeAdoption[category][val as keyof ivCatQuestionsInterface].hidden =
        false;
    } else {
      exposeAdoption[category][val as keyof ivCatQuestionsInterface].hidden =
        true;
    }
  }
  if (category === "hearAboutUsInfo") {
    if (hideOrExpose === "expose") {
      exposeAdoption[category][val as keyof ivHearAboutUsInfoInterface].hidden =
        false;
    } else {
      exposeAdoption[category][val as keyof ivHearAboutUsInfoInterface].hidden =
        true;
    }
  }
  if (volunteerOrAdoption === "volunteer") {
    setState(exposeVolunteer);
  } else {
    setState(exposeAdoption);
  }
};

export const handleExposeAndHideFields = (
  getState: AdoptionInitialValuesInterface | VolunteerInitialValuesInterface,
  setState: any,
  ev: { target: any },
  exposes: {
    [key: string]: (
      | keyof ivHealthInfoInterface
      | keyof ivOffenderInfoInterface
      | keyof ivHomeQuestionsInterface
      | keyof ivDogQuestionsInterface
      | keyof ivCatQuestionsInterface
    )[];
  },
  category:
    | keyof VolunteerInitialValuesInterface
    | keyof AdoptionInitialValuesInterface,
  form: string
) => {
  for (const [key, value] of Object.entries(exposes)) {
    if (ev.target.value === key) {
      value.forEach((val) => {
        console.log("exposing", category, val);
        exposeOrHideFields(getState, setState, category, val, "expose", form);
      });
    } else {
      if (
        //^ This added because "As an Adult" and "As a Child" both reveal the same hidden fields,
        //^ this stops them being hidden if "As an Adult" is selected then switched to "As a Child"
        ev.target.value !== "As an Adult" &&
        ev.target.value !== "As a Child"
      ) {
        value.forEach((val) => {
          exposeOrHideFields(getState, setState, category, val, "hide", form);
        });
      }
    }
  }
};

export const DropdownFormik = ({
  getState,
  setState,
  labelText,
  selectArray,
  children,
  forNameId,
  exposes,
  category,
  form,
}: {
  getState: AdoptionInitialValuesInterface | VolunteerInitialValuesInterface;
  setState: any;
  labelText: string;
  selectArray: string[];
  children: React.ReactNode;
  forNameId: string;
  exposes?: {
    [key: string]: (
      | keyof ivHealthInfoInterface
      | keyof ivOffenderInfoInterface
    )[];
  };
  path?: string;
  category:
    | keyof VolunteerInitialValuesInterface
    | keyof AdoptionInitialValuesInterface;
  form: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-end mb-4 ml-1 mr-1">
      <Label text={labelText} hFor={forNameId} />
      <Field
        className={
          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-11 p-2.5 "
        }
        name={forNameId}
        as="select"
        onClick={(e: { target: { value: any } }) => {
          if (e.target.value && exposes) {
            handleExposeAndHideFields(
              getState,
              setState,
              e,
              exposes,
              category,
              form
            );
          }
        }}
      >
        {selectArray ? (
          selectArray.map((entries) => {
            return (
              <option key={entries[0] as Key} value={entries[1]}>
                {entries[0]}
              </option>
            );
          })
        ) : (
          <></>
        )}
      </Field>
      {children}
    </div>
  );
};

export const QuestionsMap = ({
  getUseState,
  setUseState,
  category,
  values,
  type,
  err,
  touch,
}: {
  getUseState: AdoptionInitialValuesInterface | VolunteerInitialValuesInterface;
  setUseState: any;
  category:
    | keyof AdoptionInitialValuesInterface
    | keyof VolunteerInitialValuesInterface;
  type: string;
  values: any;
  err: any;
  touch: any;
}) => {
  let state;
  let stateCategory;

  if (type === "adoption") {
    state = getUseState as AdoptionInitialValuesInterface;
    stateCategory = state[category as keyof AdoptionInitialValuesInterface];
  }

  if (type === "volunteer") {
    state = getUseState as VolunteerInitialValuesInterface;
    stateCategory = state[category as keyof VolunteerInitialValuesInterface];
  }

  return stateCategory ? (
    <>
      {Object.entries(stateCategory).map((entry) => {
        let title = entry[1].title;
        let field = entry[0] as
          | keyof ivAboutQuestionsVolunteerInterface
          | keyof ivEmergencyContactInfoInterface
          | keyof ivHealthInfoInterface
          | keyof ivVolunteeringInfoInterface
          | keyof ivRefereeInfoInterface
          | keyof ivOffenderInfoInterface
          | keyof ivAboutQuestionsInterface
          | keyof ivDogMatchingQuestionsInterface
          | keyof ivCatMatchingQuestionsInterface
          | keyof ivHomeQuestionsInterface
          | keyof ivDogQuestionsInterface
          | keyof ivCatQuestionsInterface
          | keyof ivHearAboutUsInfoInterface;
        return entry[1].type === "text"
          ? !entry[1].hidden && (
              <InputTextFormik
                key={entry[0] as Key}
                labelText={title}
                val={values[category][field]}
                forNameId={`${category}.${entry[0]}`}
                type={entry[0].toLowerCase().includes("email") ? "email" : ""}
                placeholder={entry[1].placeholder}
              >
                <ErrorFormik
                  err={err}
                  touch={touch}
                  field={field}
                  parent={category}
                  id={"err-" + entry[0]}
                />
              </InputTextFormik>
            )
          : entry[1].type === "select"
          ? !entry[1].hidden && (
              <DropdownFormik
                key={entry[0] as Key}
                getState={getUseState}
                setState={setUseState}
                labelText={title}
                forNameId={`${category}.${entry[0]}`}
                selectArray={entry[1].values}
                exposes={entry[1].exposes ? entry[1].exposes : ""}
                path={`${category}.${entry[0]}`}
                category={category}
                form={type}
              >
                <ErrorFormik
                  err={err}
                  touch={touch}
                  field={field}
                  parent={category}
                  id={"err-" + entry[0]}
                />
              </DropdownFormik>
            )
          : entry[1].type === "textarea" &&
            !entry[1].hidden && (
              <div
                className={
                  "flex flex-col items-center justify-end mb-4 ml-1 mr-1"
                }
                key={entry[0] + entry[1].type}
              >
                <InputTextAreaFormik
                  key={entry[0] as Key}
                  labelText={title}
                  val={values[category][field]}
                  forNameId={`${category}.${entry[0]}`}
                >
                  <ErrorFormik
                    err={err}
                    touch={touch}
                    field={field}
                    parent={category}
                    id={"err-" + entry[0]}
                  />
                </InputTextAreaFormik>
              </div>
            );
      })}
    </>
  ) : (
    <div>loading</div>
  );
};
