import { useParams, Link } from "react-router-dom";
import useMenuById from "../viewmodels/useMenuById";

const Menus = () => {
  const { id } = useParams();
  const { menu, error } = useMenuById(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!menu) return <div>Завантаження...</div>;

  return (
    <div className="menu-page">
      <h1>Меню: {menu.name}</h1>

      {menu.image && (
        <img
          src={`http://127.0.0.1:8000${menu.image}`}
          alt={menu.name}
          style={{ width: "300px", borderRadius: "16px" }}
        />
      )}

      <h2>
        Заклад:{" "}
        <Link to={`/restorantItem/${menu.vendor.id}`}>{menu.vendor.name}</Link>
      </h2>

      {menu.categories && menu.categories.length > 0 && (
        <>
          <h3>Категорії:</h3>
          <ul>
            {menu.categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Menus;
