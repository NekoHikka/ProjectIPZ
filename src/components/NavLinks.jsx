import { NavLink } from "react-router-dom";
import menu from "../assets/images/navbar/menu.svg";
import orders from "../assets/images/navbar/orders.svg";
import restorants from "../assets/images/navbar/restorants.svg";
const links = [
  { id: 1, url: "menu", text: "Меню", img: menu },
  { id: 2, url: "orders", text: "Замовлення", img: orders },
  { id: 3, url: "restorants", text: "Заклади", img: restorants },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text, img } = link;

        return (
          <li className="navlink" key={id}>
            <img src={img} alt={text} className="navlink-icon" />
            <NavLink to={url}>{text}</NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
