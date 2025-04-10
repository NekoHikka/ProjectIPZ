import { customFetch } from "../utils";

export const getRestaurants = () => {
  return customFetch.get("/restaurants");
};
