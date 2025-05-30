import { useEffect, useState } from "react";
import { getMenuItem, getMenuById } from "../api/menu";
import { getRestaurantById } from "../api/restaurants";
import { getCategories } from "../api/categories";
import { links } from "../data/categories";

const useMenuItem = (id) => {
  const [menuItem, setMenuItem] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [menuId, setMenuId] = useState(null);
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

        const menuIdToUse = Array.isArray(item.menu) ? item.menu[0] : item.menu;
        if (!menuIdToUse) {
          console.warn("❌ menuId порожній");
          return;
        }

        const menuRes = await getMenuById(menuIdToUse);
        setMenuId(menuRes.data.id);
        setMenuName(menuRes.data.name);

        if (menuRes.data.vendor?.id) {
          setRestaurantId(menuRes.data.vendor.id);
          setRestaurantName(menuRes.data.vendor.name);
        }

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
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [id]);

  return {
    menuItem,
    restaurantId,
    restaurantName,
    menuId,
    menuName,
    categoryName,
    categoryUrl,
    error,
  };
};

export default useMenuItem;
