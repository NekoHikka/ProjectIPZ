import { customFetch } from "../utils";

export const loginUser = async (username, password) => {
  const response = await customFetch.post("/users/token/", {
    username,
    password,
  });
  return response.data;
};

export const registerUser = async (username, password, email) => {
  const response = await customFetch.post("register/", {
    username,
    password,
    email,
  });
  return response.data;
};
