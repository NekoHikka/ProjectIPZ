import useMenuItems from "../viewmodels/useMenuItems";
import star from "../assets/images/star.png";
import plus from "../assets/images/plus.png";

const Menu = () => {
  const { menus, error } = useMenuItems();

  if (error) return <div>Помилка завантаження меню: {error.message}</div>;

  return (
    <div>
      <h1 className="menu-title">Популярні замовлення</h1>
      <div className="products">
        {menus.map(({ id, name, price, image }) => (
          <div className="product" key={id}>
            <img
              src={`http://127.0.0.1:8000${image}`}
              alt={name}
              className="product-img"
            />
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={star} alt="rating" />
              ))}
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
        ))}
      </div>
    </div>
  );
};

export default Menu;
