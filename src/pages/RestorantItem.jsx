import { useParams } from "react-router-dom";
import useRestaurant from "../viewmodels/useRestaurant";

const RestorantItem = () => {
  const { id } = useParams();
  const { restaurant, error } = useRestaurant(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!restaurant) return <div>Завантаження...</div>;

  return (
    <div className="restaurant-item-page">
      <img
        src={`http://127.0.0.1:8000${restaurant.logo}`}
        alt={restaurant.name}
        style={{ width: "400px" }}
      />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default RestorantItem;
