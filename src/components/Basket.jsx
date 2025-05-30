import { useCart } from "../utils/CartContext";
import { createOrder } from "../api/orders";
import { useParams, useNavigate } from "react-router-dom";
const Basket = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Ви не авторизовані");
      return;
    }

    if (cartItems.length === 0) {
      alert("Кошик порожній");
      return;
    }

    const uniqueVendors = new Set(cartItems.map((item) => item.vendorId));
    if (uniqueVendors.size > 1) {
      alert(
        "У кошику товари з різних ресторанів. Оформлювати замовлення можна лише з одного."
      );
      return;
    }

    const vendorId = cartItems[0].vendorId;
    const items = cartItems.map((item) => ({
      menu_item: item.id,
      quantity: item.quantity,
    }));

    try {
      await createOrder({ vendor: vendorId, items }, token);
      alert("Замовлення успішно створено!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Помилка при створенні замовлення:", err);
      alert("Не вдалося створити замовлення");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="basket-container">
        <h2>Кошик порожній</h2>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <h2>Ваше замовлення:</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="basket-item">
          <img
            src={`http://127.0.0.1:8000${item.image}`}
            alt={item.name}
            className="basket-item-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.opacity = "0.7";
            }}
          />
          <div className="basket-item-info">
            <p className="item-title">{item.name}</p>
            <p className="amount">x{item.quantity}</p>
            <p className="total-one-pos">
              <span className="valute-basket">₴</span>
              {item.quantity * item.price}
            </p>
            <div className="item-actions">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      ))}

      <hr />
      <div className="total-block delivery-block">
        <p className="total-price">Загалом</p>
        <p className="total-price-amount">
          <span className="valute-basket">₴</span>
          {subtotal}
        </p>
      </div>

      <button className="orderBtn" onClick={handleOrder}>
        Оплатити
      </button>
    </div>
  );
};

export default Basket;
