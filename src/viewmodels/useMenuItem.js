import { useEffect, useState } from "react";
import { getMenuItem, getMenuById } from "../api/menu";
import { getRestaurantById } from "../api/restaurants";
import { getCategories } from "../api/categories";
import { links } from "../data/categories";

const useMenuItem = (id) => {
  const [menuItem, setMenuItem] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState(null);
  const [menuName, setMenuName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryUrl, setCategoryUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRes = await getMenuItem(id);
        const item = itemRes.data;
        setMenuItem(item);

        const categoriesRes = await getCategories();
        const matchedCategory = categoriesRes.data.find(
          (cat) => cat.id === item.category
        );
        if (matchedCategory) {
          setCategoryName(matchedCategory.name);
          const link = links.find((l) => l.text === matchedCategory.name);
          if (link) {
            setCategoryUrl(link.url);
          }
        }

        const menuRes = await getMenuById(item.menu);
        const menu = menuRes.data;
        setMenuName(menu.name);

        const restRes = await getRestaurantById(menu.vendor.id);
        setRestaurantName(restRes.data.name);
        setRestaurantId(restRes.data.id);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [id]);

  return {
    menuItem,
    restaurantName,
    restaurantId,
    menuName,
    categoryName,
    categoryUrl,
    error,
  };
};

export default useMenuItem;
