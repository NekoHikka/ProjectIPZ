import { NavLink } from "react-router-dom";
import { links } from "../data/navlinks";

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
