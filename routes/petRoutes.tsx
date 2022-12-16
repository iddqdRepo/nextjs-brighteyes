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

export const updatePet = async (data: PetInterface) => {
  const updatePet = await axios.put(`/api/pets/${data._id}`, data);
  return updatePet.data.success;
};
export const postPet = async (data: PetInterface) => {
  const addPet = await axios.post(`/api/pets`, data);
  return addPet.data.success;
};
