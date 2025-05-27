import { useParams } from "react-router-dom";
import useRestaurant from "../viewmodels/useRestaurant";
import { Navbar } from "../components";
import { Link } from "react-router-dom";

const RestorantItem = () => {
  const { id } = useParams();
  const { restaurant, error } = useRestaurant(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!restaurant) return <div>Завантаження...</div>;

  return (
    <div className="layout">
      <Navbar />
      <div className="restaurant-item-page">
        <div className="restaurant-block">
          <div className="restaurant-text">
            <h2 className="restName">{restaurant.name}</h2>
            <p className="restDesc">
              {restaurant.description || "Опис відсутній."}
            </p>
          </div>
          <img
            src={`http://127.0.0.1:8000${restaurant.logo}`}
            alt={restaurant.name}
          />
        </div>
        {restaurant.menus.length === 0 ? (
          <p>Немає меню для цього закладу</p>
        ) : (
          restaurant.menus.map((menu) => (
            <div key={menu.id} className="menu-section">
              <h3 className="menuName">{menu.name}</h3>
              <div className="menuCard">
                {menu.items.length === 0 ? (
                  <p>Це меню ще не містить страв.</p>
                ) : (
                  menu.items.map((item) => (
                    <div key={item.id} className="menu-item-card">
                      <div className="menu-item-content">
                        <div className="menu-item-text">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-descr">
                            {item.description
                              ? item.description.length > 70
                                ? `${item.description.substring(0, 70)}...`
                                : item.description
                              : "Опис відсутній"}
                          </p>
                          <Link to={`/menuItem/${item.id}`}>
                            <button className="view-button">Переглянути</button>
                          </Link>
                        </div>
                        <div className="menu-item-image-container">
                          <img
                            src={`http://127.0.0.1:8000${item.image}`}
                            alt={item.name}
                            className="productImg"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestorantItem;
