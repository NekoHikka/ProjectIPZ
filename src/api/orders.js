import { customFetch } from "../utils";

export const getOrders = () => {
  return customFetch.get("/orders/");
};

export const createOrder = (orderData, token) => {
  return customFetch.post("/orders/create/", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
