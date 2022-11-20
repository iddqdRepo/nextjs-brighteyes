import axios from "axios";
import { server } from "../config";
import { PetInterface } from "../interfaces/interfaces";

export const getPets = async () => {
  const pets = await axios.get(`${server}/api/pets`);
  return pets.data;
};

export const deletePet = async (id: string) => {
  await axios.delete(`${server}/api/pets/${id}`);
};

export const updatePet = async (data: PetInterface) => {
  const updatePet = await axios.put(`${server}/api/pets/${data._id}`, data);
  return updatePet.data.success;
};
export const postPet = async (data: PetInterface) => {
  console.log("in postPet (routes), data =", data);
  // const addPet = await axios.post(`${server}/api/pets`, data);
  const addPet = await axios.post("http://localhost:3000/api/pets", data);
  console.log("addPet (routes)", addPet);
  return addPet.data.success;
};
