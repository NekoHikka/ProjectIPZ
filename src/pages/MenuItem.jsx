import { useParams, Link } from "react-router-dom";
import useMenuItem from "../viewmodels/useMenuItem";

const MenuItem = () => {
  const { id } = useParams();
  const {
    menuItem,
    restaurantName,
    restaurantId,
    menuName,
    categoryName,
    categoryUrl,
    error,
  } = useMenuItem(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!menuItem) return <div>Завантаження...</div>;

  return (
    <div className="menu-item-page">
      <img
        src={`http://127.0.0.1:8000${menuItem.image}`}
        alt={menuItem.name}
        style={{ width: "300px", borderRadius: "16px" }}
      />
      <h2>{menuItem.name}</h2>
      <p>Ціна: {menuItem.price} ₴</p>

      {categoryName && categoryUrl && (
        <p>
          Категорія:
          <Link to={`/category/${categoryUrl}`}>
            <strong>{categoryName}</strong>
          </Link>
        </p>
      )}

      <p>
        Меню: <strong>{menuName}</strong>
      </p>

      {restaurantName && restaurantId && (
        <p>
          Заклад:
          <Link to={`/restorantItem/${restaurantId}`}>
            <strong>{restaurantName}</strong>
          </Link>
        </p>
      )}
    </div>
  );
};

export default MenuItem;
