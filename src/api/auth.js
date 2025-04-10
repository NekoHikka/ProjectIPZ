import { customFetch } from "../utils";

export const loginUser = async (username, password) => {
  const response = await customFetch.post("/users/token/", {
    username,
    password,
  });
  return response.data;
};
