import { NavLink } from "react-router-dom";

import { linksToAuth } from "../data/linksToAuth";

const LinksToAuth = () => {
  return (
    <div className="linksToAuth">
      {linksToAuth.map((link) => {
        const { id, url, text } = link;

        return (
          <NavLink to={url} key={id}>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default LinksToAuth;
