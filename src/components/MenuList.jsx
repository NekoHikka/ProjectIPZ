import ProductCard from "./ProductCard";

const MenuList = ({ menus }) => {
  return (
    <div className="products">
      {menus.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default MenuList;
