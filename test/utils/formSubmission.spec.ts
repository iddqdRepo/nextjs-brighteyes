import { describe, expect, it } from "@jest/globals";
import {
  firstCheckboxValue,
  normalizeCheckboxFields,
} from "../../utils/formSubmission";

describe("form submission checkbox normalization", () => {
  it("takes the single value from Formik's checkbox array", () => {
    expect(firstCheckboxValue(["Yes"])).toBe("Yes");
    expect(firstCheckboxValue([])).toBe("");
  });

  it("leaves an already-normalized retry value intact", () => {
    expect(firstCheckboxValue("Yes")).toBe("Yes");
  });

  it("normalizes a copy without corrupting Formik's state", () => {
    const values = {
      name: "Applicant",
      future: ["Yes"],
      past: ["No"],
    };

    const firstAttempt = normalizeCheckboxFields(values, ["future", "past"]);
    const secondAttempt = normalizeCheckboxFields(firstAttempt, [
      "future",
      "past",
    ]);

    expect(firstAttempt).toEqual({
      name: "Applicant",
      future: "Yes",
      past: "No",
    });
    expect(secondAttempt).toEqual(firstAttempt);
    expect(values.future).toEqual(["Yes"]);
  });
});
