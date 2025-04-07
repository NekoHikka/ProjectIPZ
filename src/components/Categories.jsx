import donut from "../assets/images/categories/donut.png";
import burger from "../assets/images/categories/burger.png";
import soda from "../assets/images/categories/soda.png";
import chicken from "../assets/images/categories/chicken.png";
import pizza from "../assets/images/categories/pizza.png";
import fish from "../assets/images/categories/fish.png";
const links = [
  { id: 1, text: "Випічка", img: donut },
  { id: 2, text: "Бургери", img: burger },
  { id: 3, text: "Напої", img: soda },
  { id: 4, text: "Курка", img: chicken },
  { id: 5, text: "Піца", img: pizza },
  { id: 6, text: "Риба", img: fish },
];

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
