import { customFetch } from "../utils";

export const getRestaurants = () => {
  return customFetch.get("/restaurants");
};

export const getRestaurantById = (id) => customFetch.get(`/vendors/${id}`);

export const checkVendorsChanged = () => {
  return customFetch.get("/api/vendors/has-changed/");
};
