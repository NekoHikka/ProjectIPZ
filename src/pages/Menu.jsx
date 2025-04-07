import { useEffect, useState } from "react";
import { customFetch } from "../utils/index.js";
import star from "../assets/images/star.png";
import plus from "../assets/images/plus.png";
const Menu = () => {
  const [menus, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get("/menuItems");
        console.log("Відповідь від API:", response.data);
        setMenu(response.data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="menu-title">Популярні замовлення</h1>
      <div className="products">
        {menus.map((menu) => {
          const { id, name, price } = menu;
          return (
            <div class="product" key={id}>
              <img
                src={`http://127.0.0.1:8000${menu.image}`}
                alt={name}
                className="product-img"
              />
              <div className="stars">
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
              </div>

              <div>
                <h2>{name}</h2>
                <div className="price-wrapper">
                  <div className="price-container">
                    <p className="price">{price}</p>
                    <span className="valute">₴</span>
                  </div>
                  <button className="addingToBasket">
                    <img src={plus} alt="add" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
