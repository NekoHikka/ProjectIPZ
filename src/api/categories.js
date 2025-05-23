import { customFetch } from "../utils";

export const getCategories = () => customFetch.get("/categories/");
