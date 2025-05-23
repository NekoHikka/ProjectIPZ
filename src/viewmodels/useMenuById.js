import { useEffect, useState } from "react";
import { getMenuById } from "../api/menu";

const useMenuById = (id) => {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenuById(id);
        setMenu(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchMenu();
  }, [id]);

  return { menu, error };
};

export default useMenuById;
