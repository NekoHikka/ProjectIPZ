import { useRestaurants } from "../viewmodels/useRestaurants";
import { Link } from "react-router-dom";
const RestorantGrid = () => {
  const { restaurants } = useRestaurants();
  // const { restaurants, lastUpdate } = useRestaurants();
  return (
    <>
      {/* Оновлено: {new Date(lastUpdate).toLocaleTimeString()} */}
      <div className="restaurants">
        {restaurants.map(({ id, name, logo }) => (
          <div className="restaurant" key={id}>
            <Link to={`/restorantItem/${id}`}>
              <img src={`http://127.0.0.1:8000${logo}`} alt={name} />
            </Link>

            <h2>{name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default RestorantGrid;
