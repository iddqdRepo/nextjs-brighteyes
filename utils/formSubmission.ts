//Formik checkbox groups are arrays in the browser, but these forms store a
//single answer. Normalize a copy so a failed submission can be retried without
//mutating Formik's state ("Yes" used to become "Y" on the second attempt).
export const firstCheckboxValue = <T>(value: T | T[]): T | "" => {
  if (!Array.isArray(value)) {
    return value;
  }

  return value[0] ?? "";
};

export const normalizeCheckboxFields = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  values: T,
  fields: K[]
): T => {
  const normalized = { ...values };

  for (const field of fields) {
    normalized[field] = firstCheckboxValue(
      values[field] as T[K] | T[K][]
    ) as T[K];
  }

  return normalized;
};
