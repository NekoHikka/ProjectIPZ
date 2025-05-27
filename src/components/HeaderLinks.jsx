import { NavLink } from "react-router-dom";
import { links } from "../data/links";

const HeaderLinks = () => {
  return (
    <div className="header-links">
      {links.map((link) => {
        const { id, url, text } = link;

        return (
          <NavLink to={url} key={id} className="header-link">
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
