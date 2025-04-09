import { LinksToAuth } from "../components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.href = "/";
  };
  return (
    <>
      {isLoggedIn ? (
        <div>
          <div className="userNav">
            <Link to="/profile" className="nav-link">
              Мій профіль
            </Link>
            <Link to="/settings" className="nav-link">
              Налаштування
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Вийти
            </button>
          </div>
        </div>
      ) : (
        <div className="userPanelContent">
          <LinksToAuth />
          <p className="warningForUser">
            Увійдіть в систему, щоб мати доступ до повної функціональності
            додатку
          </p>
        </div>
      )}
    </>
  );
};

export default UserPanel;
