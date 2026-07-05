import axios from "axios";

import { server } from "../config";

export type AccessSelection = {
  superuser: boolean;
  animals: boolean;
  forms: boolean;
  donations: boolean;
};

//Shape of the access fields the users API expects.
const toAccessPayload = (access: AccessSelection) =>
  access.superuser
    ? { role: "superuser" as const }
    : {
        role: "staff" as const,
        permissions: {
          animals: access.animals,
          forms: access.forms,
          donations: access.donations,
        },
      };

export const getUsers = async () => {
  const users = await axios.get(`/api/users`);
  return users.data;
};

export const getUserByUsername = async (username: string) => {
  const users = await axios.get(`${server}/api/users/${username}`);
  return users.data;
};

export const deleteUser = async (username: string) => {
  const deleteUser = await axios.delete(
    `/api/users/${encodeURIComponent(username)}`
  );
  return deleteUser.data.success;
};

export const updateUserAccess = async (
  username: string,
  access: AccessSelection
) => {
  const updated = await axios.put(
    `/api/users/${encodeURIComponent(username)}`,
    toAccessPayload(access)
  );
  return updated.data.success;
};

export const resetUserPassword = async (username: string, password: string) => {
  const updated = await axios.put(
    `/api/users/${encodeURIComponent(username)}`,
    { password }
  );
  return updated.data.success;
};

export const postUser = async (data: {
  username: string;
  password: string;
  access: AccessSelection;
}) => {
  const addUser = await axios.post(`/api/users`, {
    username: data.username,
    password: data.password,
    ...toAccessPayload(data.access),
  });
  return addUser.data.success;
};
