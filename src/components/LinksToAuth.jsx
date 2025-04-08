import { NavLink } from "react-router-dom";

const linksToAuth = [
  { id: 1, url: "login", text: "Увійти" },
  {
    id: 2,
    url: "register",
    text: "Зареєстуватися",
  },
];

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
