import axios from "axios";
import { UserInterface } from "../interfaces/interfaces";

import { server } from "../config";

export const getUsers = async () => {
  const users = await axios.get(`/api/users`);
  return users.data;
};

export const getUserByUsername = async (username: string) => {
  const users = await axios.get(`${server}/api/users/${username}`);
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
