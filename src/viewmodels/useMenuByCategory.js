import { useEffect, useState } from "react";
import { getMenuItems } from "../api/menu";
import { getCategories } from "../api/categories";
import { categoryUrlToName } from "../utils/categoryMap";

const useMenuByCategory = (categoryUrl) => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredMenu = async () => {
      try {
        const res = await getMenuItems();
        const categoryRes = await getCategories();

        const categoryName = categoryUrlToName[categoryUrl];
        if (!categoryName) {
          setMenus([]);
          return;
        }

        const matchedCategory = categoryRes.data.find(
          (cat) => cat.name === categoryName
        );

        if (!matchedCategory) {
          setMenus([]);
          return;
        }

        const filtered = res.data.filter(
          (item) => item.category === matchedCategory.id
        );

        setMenus(filtered);
      } catch (err) {
        setError(err);
      }
    };

    fetchFilteredMenu();
  }, [categoryUrl]);

  return { menus, error };
};

export default useMenuByCategory;
