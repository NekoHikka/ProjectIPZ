import logo from "../assets/images/logo.png";
import defaultAvatar from "../assets/images/default-avatar-reviews.png";
import { NavLink } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import { useProfileViewModel } from "../viewmodels/useProfile";

const Header = () => {
  const { profileData, loading } = useProfileViewModel();

  return (
    <div className="header-block">
      <NavLink to="/" className="logo-container">
        <img src={logo} alt="logo" className="logo-header" />
        <span>Jet Food</span>
      </NavLink>

      <HeaderLinks />

      <div className="header-profile">
        {loading ? (
          <div className="profile-image-loading">...</div>
        ) : (
          <img
            src={profileData.profileImage || defaultAvatar}
            alt="Профіль"
            className="header-avatar"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
