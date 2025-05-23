import { useParams } from "react-router-dom";
import useRestaurant from "../viewmodels/useRestaurant";

const RestorantItem = () => {
  const { id } = useParams();
  const { restaurant, error } = useRestaurant(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!restaurant) return <div>Завантаження...</div>;

  return (
    <div
      className="restaurant-item-page"
      style={{ padding: "20px", textAlign: "center" }}
    >
      <img
        src={`http://127.0.0.1:8000${restaurant.logo}`}
        alt={restaurant.name}
        style={{ width: "300px", borderRadius: "16px" }}
      />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description || "Опис відсутній."}</p>

      {restaurant.menus.length === 0 ? (
        <p>Немає меню для цього закладу</p>
      ) : (
        restaurant.menus.map((menu) => (
          <div key={menu.id} style={{ marginTop: "40px" }}>
            <h3>{menu.name}</h3>
            {menu.image && (
              <img
                src={`http://127.0.0.1:8000${menu.image}`}
                alt={menu.name}
                style={{ width: "250px", borderRadius: "12px" }}
              />
            )}
            <div
              className="products"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {menu.items.length === 0 ? (
                <p>Це меню ще не містить страв.</p>
              ) : (
                menu.items.map((item) => (
                  <div
                    key={item.id}
                    className="product"
                    style={{
                      width: "280px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    <img
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <h4 style={{ marginTop: "10px" }}>{item.name}</h4>
                    <p>₴{item.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RestorantItem;
