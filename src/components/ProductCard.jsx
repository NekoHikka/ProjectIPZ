import star from "../assets/images/star.svg";
import plus from "../assets/images/plus.png";
import { useCart } from "../utils/CartContext";
import { Link } from "react-router-dom";
import { getMenuItem, getMenuById } from "../api/menu";

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart } = useCart();

  const handleAdd = async () => {
    try {
      const itemRes = await getMenuItem(id);
      const item = itemRes.data;

      const menuId = Array.isArray(item.menu) ? item.menu[0] : item.menu;
      if (!menuId) {
        alert("Неможливо додати товар: не знайдено меню.");
        return;
      }

      const menuRes = await getMenuById(menuId);
      const vendorId = menuRes.data.vendor?.id;

      if (!vendorId) {
        alert("Неможливо додати товар: не знайдено заклад.");
        return;
      }

      const newItem = { id, name, price, image, vendorId };
      console.log("🛒 Додаємо до кошика з меню:", newItem);
      addToCart(newItem);
    } catch (err) {
      console.error("Помилка при додаванні:", err);
      alert("Не вдалося додати товар до кошика.");
    }
  };

  return (
    <div className="product" key={id}>
      <div className="product-img-container">
        <Link to={`/menuItem/${id}`}>
          <img
            src={`http://127.0.0.1:8000${image}`}
            alt={name}
            className="product-img"
          />
        </Link>
      </div>
      <div className="product-info">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={star} alt="rating" className="star-icon" />
          ))}
        </div>
        <h2 className="product-name">{name}</h2>
        <div className="price-wrapper">
          <div className="price-container">
            <p className="price">{price}</p>
            <span className="valute">₴</span>
          </div>
          <button className="addingToBasket" onClick={handleAdd}>
            <img src={plus} alt="add" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
