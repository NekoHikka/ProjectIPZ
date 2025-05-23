import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error };
};

export default useCategories;
