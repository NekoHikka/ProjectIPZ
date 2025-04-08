import { useParams } from "react-router-dom";
import { links } from "../data/categories";
const CategoryProducts = () => {
  const { categoryUrl } = useParams();
  const currentCategory = links.find(
    (category) => category.url === categoryUrl
  );
  return (
    <div>
      <h1 className="menu-title">
        {currentCategory ? currentCategory.text : "Категорія не знайдена"}
      </h1>
    </div>
  );
};

export default CategoryProducts;
