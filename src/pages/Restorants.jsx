import { useEffect, useState } from "react";
import { customFetch } from "../utils/index.js";

const Restorants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get("/restaurants");
        console.log("Відповідь від API:", response.data);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="restaurants">
        {restaurants.map((restaurant) => {
          const { id, name } = restaurant;
          return (
            <div className="restaurant" key={id}>
              <img src={`http://127.0.0.1:8000${restaurant.logo}`} alt={name} />

              <h2>{name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restorants;
