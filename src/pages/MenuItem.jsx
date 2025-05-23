import { useParams, Link } from "react-router-dom";
import useMenuItem from "../viewmodels/useMenuItem";

const MenuItem = () => {
  const { id } = useParams();
  const {
    menuItem,
    restaurantName,
    restaurantId,
    menuName,
    menuId,
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

      {menuItem.description && menuItem.description.length > 0 ? (
        <div>
          <p>Опис:</p>
          <ul>
            {menuItem.description
              .split("-")
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Ця страва не має опису</p>
      )}

      {categoryName && categoryUrl && (
        <p>
          Категорія:
          <Link to={`/category/${categoryUrl}`}>
            <strong>{categoryName}</strong>
          </Link>
        </p>
      )}

      <p>
        Меню:
        <Link to={`/menus/${menuId}`}>
          <strong>{menuName}</strong>
        </Link>
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
