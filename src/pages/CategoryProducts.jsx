import { useParams } from "react-router-dom";
import { links } from "../data/categories";
import useMenuByCategory from "../viewmodels/useMenuByCategory";
import { useSearch } from "../utils/SearchContext";
import MenuList from "../components/MenuList";

const CategoryProducts = () => {
  const { categoryUrl } = useParams();
  const { searchQuery } = useSearch();

  const currentCategory = links.find(
    (category) => category.url === categoryUrl
  );
  const { menus, error } = useMenuByCategory(categoryUrl);

  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredMenus.length === 0) {
    return (
      <div>
        <h1>Нічого не знайдено за запитом</h1>
      </div>
    );
  }

  if (error) return <div>Помилка: {error.message}</div>;

  return (
    <div>
      <h1 className="menu-title">
        {currentCategory ? currentCategory.text : "Категорія не знайдена"}
      </h1>
      <MenuList menus={filteredMenus} />
    </div>
  );
};

export default CategoryProducts;
