import { useParams } from "react-router-dom";
import useMenuByCategory from "../viewmodels/useMenuByCategory";
import { useSearch } from "../utils/SearchContext";
import MenuList from "../components/MenuList";
import { categoryUrlToName } from "../utils/categoryMap";

const CategoryProducts = () => {
  const { categoryUrl } = useParams();
  const { searchQuery } = useSearch();

  const { menus, error } = useMenuByCategory(categoryUrl);
  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryName = categoryUrlToName[categoryUrl];

  if (error) return <div>Помилка: {error.message}</div>;

  if (filteredMenus.length === 0) {
    return <h1>Нічого не знайдено за запитом</h1>;
  }

  return (
    <div>
      <h1 className="menu-title">{categoryName || "Категорія не знайдена"}</h1>
      <MenuList menus={filteredMenus} />
    </div>
  );
};

export default CategoryProducts;
