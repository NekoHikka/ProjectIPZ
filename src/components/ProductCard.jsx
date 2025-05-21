import star from "../assets/images/star.svg";
import plus from "../assets/images/plus.png";
import { useCart } from "../utils/CartContext";

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart } = useCart();

  return (
    <div className="product" key={id}>
      <div className="product-img-container">
        <img
          src={`http://127.0.0.1:8000${image}`}
          alt={name}
          className="product-img"
        />
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
          <button
            className="addingToBasket"
            onClick={() => addToCart({ id, name, price, image })}
          >
            <img src={plus} alt="add" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
