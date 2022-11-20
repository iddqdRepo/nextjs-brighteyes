import { PetInterface } from "../interfaces/interfaces";

export const sanitizeInput = (data: PetInterface) => {
  let sanitizedData: PetInterface = { ...data };
  Object.entries(data).forEach(([key, value]) => {
    let newValue: string = value;
    if (
      key != "image" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "updatedAt"
    ) {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
      newValue = newValue.trim();
    }
    sanitizedData[key as keyof PetInterface] = newValue as string;
  });
  console.log("data sanitized", sanitizedData);
  return sanitizedData;
};
