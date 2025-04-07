import { useState, useEffect } from "react";
import { customFetch } from "../utils";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await customFetch.get("/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants };
};
