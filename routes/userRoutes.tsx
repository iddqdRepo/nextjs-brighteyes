import axios from "axios";
import { UserInterface } from "../interfaces/interfaces";

export const getUsers = async () => {
  const users = await axios.get(`/api/users`);
  return users.data;
};

export const getUserByUsername = async (username: string) => {
  console.log("getUserByUsername username=", username);
  const users = await axios.get(`/api/users/${username}`);
  // console.log("userRoutes getUserByUsername", users.data);
  return users.data;
};

export const deleteUser = async (username: string) => {
  const deleteUser = await axios.delete(`/api/users/${username}`);
  return deleteUser.data.success;
};

export const updateUser = async (data: UserInterface) => {
  const updateUser = await axios.put(`/api/users/${data.username}`, data);
  return updateUser.data.success;
};

export const postUser = async (data: UserInterface) => {
  const addUser = await axios.post(`/api/users`, data);
  return addUser.data.success;
};
