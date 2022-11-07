import axios from "axios";
import { PetInterface } from "../interfaces/interfaces";

export const getPets = async () => {
  const pets = await axios.get("http://localhost:3000/api/pets");
  return pets.data;
};

export const deletePet = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/pets/${id}`);
};

export const updatePet = async (data: PetInterface) => {
  await axios.put(`http://localhost:3000/api/pets/${data._id}`, data);
};
export const postPet = async (data: PetInterface) => {
  const addPet = await axios.post(`http://localhost:3000/api/pets`, data);
  return addPet.data.success;
};
