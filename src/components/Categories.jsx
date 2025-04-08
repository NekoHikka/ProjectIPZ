import { links } from "../data/categories";

const Categories = () => {
  return (
    <>
      <h3 className="categories-title">Категорії</h3>
      <div className="categories">
        {links.map((link) => {
          const { id, text, img } = link;

          return (
            <div key={id}>
              <img src={img} alt={text} />
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
