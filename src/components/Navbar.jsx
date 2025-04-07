import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
