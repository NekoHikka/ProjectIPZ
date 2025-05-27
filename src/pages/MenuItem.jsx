import { useParams, Link } from "react-router-dom";
import useMenuItem from "../viewmodels/useMenuItem";
import { Header, Reviews } from "../components";
import BtnDown from "../assets/images/buttons/button-down.svg";

const MenuItem = () => {
  const { id } = useParams();
  const {
    menuItem,
    restaurantName,
    restaurantId,
    menuName,
    menuId,
    categoryName,
    categoryUrl,
    error,
  } = useMenuItem(id);

  if (error) return <div>Помилка: {error.message}</div>;
  if (!menuItem) return <div>Завантаження...</div>;

  return (
    <>
      <Header />
      <div className="menu-details-container">
        {/* Фото зліва */}
        <div className="menu-item-image-block">
          <img
            src={`http://127.0.0.1:8000${menuItem.image}`}
            alt={menuItem.name}
            className="img-item"
          />
        </div>

        {/* Інформація справа */}
        <div className="menu-item-info-block">
          <h2 className="item-name">{menuItem.name}</h2>
          <p className="item-price">{menuItem.price}₴</p>

          {menuItem.description && menuItem.description.length > 0 ? (
            <>
              <ul className="item-description-list">
                {menuItem.description
                  .split("-")
                  .map((line) => line.trim())
                  .filter((line) => line.length > 0)
                  .map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
              </ul>
            </>
          ) : (
            <p className="item-description">Ця страва не має опису</p>
          )}

          <h3 className="nutritional-value">Харчова цінність</h3>
          <section className="container">
            <div className="tabs">
              <div className="tab">
                <input type="checkbox" id="checkbox1" className="input-check" />
                <label className="tab-label" htmlFor="checkbox1">
                  Калорії
                  <img src={BtnDown} alt="button down" />
                </label>

                <div className="tab-content">Інформацію не надано</div>
              </div>

              <div className="tab">
                <input type="checkbox" id="checkbox2" className="input-check" />
                <label className="tab-label" htmlFor="checkbox2">
                  Протеїни
                  <img src={BtnDown} alt="button down" />
                </label>
                <div className="tab-content">Інформацію не надано</div>
              </div>

              <div className="tab">
                <input type="checkbox" id="checkbox3" className="input-check" />
                <label className="tab-label" htmlFor="checkbox3">
                  Білки
                  <img src={BtnDown} alt="button down" />
                </label>
                <div className="tab-content">Інформацію не надано</div>
              </div>

              <div className="tab">
                <input type="checkbox" id="checkbox4" className="input-check" />
                <label className="tab-label" htmlFor="checkbox4">
                  Жири
                  <img src={BtnDown} alt="button down" />
                </label>
                <div className="tab-content">Інформацію не надано</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Reviews />
    </>
  );
};

export default MenuItem;
