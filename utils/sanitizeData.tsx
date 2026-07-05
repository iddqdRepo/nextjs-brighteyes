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
      const trimmedValue = value.trim();
      newValue = trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
    }
    sanitizedData[key as keyof PetInterface] = newValue as string;
  });
  return sanitizedData;
};
