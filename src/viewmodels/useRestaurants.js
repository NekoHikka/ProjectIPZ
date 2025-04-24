import { useEffect, useState } from "react";
import { getRestaurants, checkVendorsChanged } from "../api/restaurants";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data);
    } catch (err) {
      console.error("Помилка запиту:", err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(async () => {
      try {
        const res = await checkVendorsChanged();
        if (res.data.vendors_changed) {
          await fetchData();
          setLastUpdate(res.data.timestamp);
        }
      } catch (err) {
        console.error("Помилка при polling:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { restaurants, error, lastUpdate };
};
