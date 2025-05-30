import axios from "axios";

const productionUrl = "http://127.0.0.1:8000/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
