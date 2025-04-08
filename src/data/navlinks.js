import menu from "../assets/images/navbar/menu1.svg";
import orders from "../assets/images/navbar/orders.svg";
import restorants from "../assets/images/navbar/restorants.svg";

import menuActive from "../assets/images/navbar/menu.svg";
import ordersActive from "../assets/images/navbar/ordersActive.svg";
import restorantsActive from "../assets/images/navbar/restorantsActive.svg";

export const links = [
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
