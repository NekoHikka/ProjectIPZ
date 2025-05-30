import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchOrders();
  }, []);

  return { orders, error };
};

export default useOrders;
