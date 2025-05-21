import useMenuItems from "../viewmodels/useMenuItems";
import { useSearch } from "../utils/SearchContext";
import MenuList from "../components/MenuList";

const MenuGrid = () => {
  const { menus, error } = useMenuItems();
  const { searchQuery } = useSearch();

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

  if (error) return <div>Помилка завантаження меню: {error.message}</div>;

  return (
    <>
      <h1 className="menu-title">Популярні замовлення</h1>
      <MenuList menus={filteredMenus} />
    </>
  );
};

export default MenuGrid;
