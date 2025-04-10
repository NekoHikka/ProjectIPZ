import { useEffect, useState } from "react";
import { getMenuItems } from "../api/menu";

const useMenuItems = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMenuItems();
        setMenus(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { menus, error };
};

export default useMenuItems;
