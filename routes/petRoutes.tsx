import axios from "axios";
import { PetInterface } from "../interfaces/interfaces";

export const getPets = async () => {
  const pets = await axios.get(`/api/pets`);
  return pets.data;
};
export const getAvailablePets = async () => {
  const pets = await axios.get(`/api/pets?adopted=No`);
  return pets.data;
};

export const deletePet = async (id: string) => {
  await axios.delete(`/api/pets/${id}`);
};

//Return false on failure instead of throwing, so the admin form shows
//"ERROR, try again" rather than spinning forever (axios throws on non-2xx,
//e.g. an expired session or a photo over the body-size limit).
export const updatePet = async (data: PetInterface) => {
  try {
    const updatePet = await axios.put(`/api/pets/${data._id}`, data);
    return updatePet.data?.success === true;
  } catch {
    return false;
  }
};
export const postPet = async (data: PetInterface) => {
  try {
    const addPet = await axios.post(`/api/pets`, data);
    return addPet.data?.success === true;
  } catch {
    return false;
  }
};
