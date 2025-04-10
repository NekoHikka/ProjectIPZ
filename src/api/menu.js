import { customFetch } from "../utils";

export const getMenuItems = () => {
  return customFetch.get("/menuItems");
};
