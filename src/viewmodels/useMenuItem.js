import { useEffect, useState } from "react";
import { getMenuItem, getMenuById, getRestaurantById } from "../api/menuItem";

const useMenuItem = (id) => {
  const [menuItem, setMenuItem] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRes = await getMenuItem(id);
        const item = itemRes.data;
        setMenuItem(item);

        const menuRes = await getMenuById(item.menu);
        const menu = menuRes.data;

        const restRes = await getRestaurantById(menu.vendor);
        setRestaurantName(restRes.data.name);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [id]);

  return { menuItem, restaurantName, error };
};

export default useMenuItem;
