import { customFetch } from "../utils";

export const getMenuItems = () => {
  return customFetch.get("/menuItems");
};
export const getMenuItem = (id) => customFetch.get(`/menuItems/${id}`);
export const getMenuById = (id) => customFetch.get(`/menus/${id}`);
