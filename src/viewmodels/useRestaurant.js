// viewmodels/useRestaurant.js
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/menuItem"; // або з окремого файлу, якщо api поділено

const useRestaurant = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await getRestaurantById(id);
        setRestaurant(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchRestaurant();
  }, [id]);

  return { restaurant, error };
};

export default useRestaurant;
