import axios from "axios";
import { server } from "../config";
import { UserInterface } from "../interfaces/interfaces";

export const getUsers = async () => {
  const users = await axios.get(`${server}/api/users`);
  return users.data;
};

export const getUserByUsername = async (username: string) => {
  console.log("getUserByUsername username=", username);
  const users = await axios.get(`${server}/api/users/${username}`);
  // console.log("userRoutes getUserByUsername", users.data);
  return users.data;
};

export const deleteUser = async (username: string) => {
  const deleteUser = await axios.delete(`${server}/api/users/${username}`);
  return deleteUser.data.success;
};

export const updateUser = async (data: UserInterface) => {
  const updateUser = await axios.put(
    `${server}/api/users/${data.username}`,
    data
  );
  return updateUser.data.success;
};

export const postUser = async (data: UserInterface) => {
  const addUser = await axios.post(`${server}/api/users`, data);
  return addUser.data.success;
};
