import { useEffect, useState } from "react";
import { getMenuItems } from "../api/menu";
import { links } from "../data/categories";

const useMenuByCategory = (categoryUrl) => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredMenu = async () => {
      try {
        const res = await getMenuItems();

        const matchedCategory = links.find((cat) => cat.url === categoryUrl);
        const categoryName = matchedCategory?.text;

        if (!categoryName) {
          setMenus([]);
          return;
        }

        const filtered = res.data.filter(
          (item) =>
            item.description?.toLowerCase() === categoryName.toLowerCase()
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
