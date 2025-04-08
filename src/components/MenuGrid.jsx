import useMenuItems from "../viewmodels/useMenuItems";
import star from "../assets/images/star.svg";
import plus from "../assets/images/plus.png";

const MenuGrid = () => {
  const { menus, error } = useMenuItems();
  if (error) return <div>Помилка завантаження меню: {error.message}</div>;

  return (
    <div>
      <div className="products">
        {menus.map(({ id, name, price, image }) => (
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
                <button className="addingToBasket">
                  <img src={plus} alt="add" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
