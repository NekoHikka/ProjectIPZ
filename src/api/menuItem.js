import { customFetch } from "../utils";

export const getMenuItem = (id) => customFetch.get(`/menuItems/${id}`);
export const getMenuById = (id) => customFetch.get(`/menus/${id}`);
export const getRestaurantById = (id) => customFetch.get(`/restaurants/${id}`);
