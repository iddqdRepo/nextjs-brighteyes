import { PetInterface } from "../interfaces/interfaces";

export const sanitizeInput = (data: PetInterface) => {
  let sanitizedData: PetInterface = { ...data };
  Object.entries(data).forEach(([key, value]) => {
    let newValue = value;
    if (
      key != "image" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "updatedAt" &&
      key !== "createdAt" &&
      //Legacy documents can hold non-string values; capitalising those
      //would throw mid-submit and strand the form in its loading state.
      typeof value === "string"
    ) {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
      newValue = newValue.trim();
    }
    sanitizedData[key as keyof PetInterface] = newValue as string;
  });
  return sanitizedData;
};
