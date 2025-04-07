import { useRestaurants } from "../viewmodels/useRestaurants";

const Restorants = () => {
  const { restaurants } = useRestaurants();

  return (
    <div className="restaurants">
      {restaurants.map(({ id, name, logo }) => (
        <div className="restaurant" key={id}>
          <img src={`http://127.0.0.1:8000${logo}`} alt={name} />
          <h2>{name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Restorants;
