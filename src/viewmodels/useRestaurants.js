import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurants";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRestaurants();
        setRestaurants(res.data);
      } catch (err) {
        console.error("Помилка запиту:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { restaurants, error };
};
