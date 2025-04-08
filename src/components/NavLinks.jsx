import { NavLink } from "react-router-dom";
import menu from "../assets/images/navbar/menu1.svg";
import orders from "../assets/images/navbar/orders.svg";
import restorants from "../assets/images/navbar/restorants.svg";

import menuActive from "../assets/images/navbar/menu.svg";
import ordersActive from "../assets/images/navbar/ordersActive.svg";
import restorantsActive from "../assets/images/navbar/restorantsActive.svg";

const links = [
  { id: 1, url: "menu", text: "Меню", img: menu, activeImg: menuActive },
  {
    id: 2,
    url: "orders",
    text: "Замовлення",
    img: orders,
    activeImg: ordersActive,
  },
  {
    id: 3,
    url: "restorants",
    text: "Заклади",
    img: restorants,
    activeImg: restorantsActive,
  },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text, img, activeImg } = link;

        return (
          <NavLink
            to={url}
            key={id}
            className={({ isActive }) =>
              `navlink ${isActive ? "active-navlink" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeImg : img}
                  alt={text}
                  className="navlink-icon"
                />
                {text}
              </>
            )}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;
