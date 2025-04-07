import { useEffect, useState } from "react";
import { customFetch } from "../utils";

const useMenuItems = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    try {
      const response = await customFetch.get("/menuItems");
      setMenus(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return { menus, error };
};

export default useMenuItems;
