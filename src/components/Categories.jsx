import { Link } from "react-router-dom";
import { links } from "../data/categories";

const Categories = () => {
  return (
    <>
      <h3 className="categories-title">Категорії</h3>
      <div className="categories">
        {links.map((link) => {
          const { id, text, img, url } = link;

          return (
            <Link to={`/category/${url}`} key={id} className="category-link">
              <div className="category-item">
                <img src={img} alt={text} className="category-img" />
                <p className="category-text">{text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
