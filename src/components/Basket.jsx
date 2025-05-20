import { useCart } from "../utils/CartContext";

const Basket = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const deliveryFee = 50;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

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
          />
          <div className="basket-item-info">
            <p className="item-title">{item.name}</p>
            <p className="amount">x{item.quantity}</p>
            <p className="total-one-pos">
              +<span className="valute-basket">₴</span>
              {item.quantity * item.price}{" "}
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
      <div className="delivery-block">
        <p className="amount">Доставка</p>
        <p className="total-one-pos">
          +<span className="valute-basket">₴</span>
          {deliveryFee}
        </p>
      </div>
      <div className="total-block delivery-block">
        <p className="total-price">Загалом</p>
        <p className="total-price-amount">
          <span className="valute-basket">₴</span>
          {total}
        </p>
      </div>

      <button className="orderBtn">Оплатити</button>
    </div>
  );
};

export default Basket;
