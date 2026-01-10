import { exposeOrHideFields } from "../components/IndividualFormLayout/CommonFormComponents";
import {
  AdoptionInitialValuesInterface,
  ivHomeQuestionsInterface,
  ivDogQuestionsInterface,
  ivCatQuestionsInterface,
} from "../interfaces/adoptionInitialValuesInterface";
import {
  VolunteerFormInterface,
  ivHealthInfoInterface,
  ivOffenderInfoInterface,
} from "../interfaces/volunteerFormInterface";

export const handleExposeAndHideFields = (
  getState: AdoptionInitialValuesInterface | VolunteerFormInterface,
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
  category: keyof VolunteerFormInterface | keyof AdoptionInitialValuesInterface,
  form: string
) => {
  for (const [key, value] of Object.entries(exposes)) {
    if (ev.target.value === key) {
      value.forEach((val) => {
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
