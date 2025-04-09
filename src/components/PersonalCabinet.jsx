import { useEffect, useState, useRef } from "react";
import notifiction from "../assets/images/notification.svg";
import axios from "axios";
import defaultAvatar from "../assets/images/default-avatar.svg";
import location from "../assets/images/location.svg";

const PersonalCabinet = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    location: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileImagePath = response.data.profile_image
          ? `${baseURL}${response.data.profile_image}`
          : null;

        setProfileData({
          username: response.data.username,
          location: response.data.location,
          profileImage: profileImagePath,
        });

        localStorage.setItem("username", response.data.username);
        if (profileImagePath) {
          localStorage.setItem("profileImage", profileImagePath);
        }
      } catch (error) {
        console.error("Помилка при завантаженні даних профілю:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAddressChange = () => {
    setNewAddress(profileData.location || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewAddress(profileData.location);
  };

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await axios.patch(
        `${baseURL}/api/profile/`,
        { location: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfileData((prev) => ({ ...prev, location: response.data.location }));
      setEditingAddress(false);
    } catch (error) {
      console.error("Помилка при оновленні адреси:", error);
      alert("Не вдалося зберегти адресу.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="personal-cabinet">
      <div className="profile-header">
        <div className="notification-box">
          <img src={notifiction} alt="notification" />
        </div>

        <div
          className="profile-image-container"
          onClick={() => setShowMenu(!showMenu)}
        >
          {loading ? (
            <div className="profile-image-loading">...</div>
          ) : (
            <img
              src={profileData.profileImage || defaultAvatar}
              alt="Фото профілю"
              className="profile-image"
              onError={(e) => {
                console.log("Помилка завантаження зображення");
                e.target.src = defaultAvatar;
              }}
            />
          )}

          {showMenu && (
            <div className="profile-menu" ref={menuRef}>
              <button className="menu-item">Змінити фото</button>
              <button className="menu-item" onClick={handleLogout}>
                Вийти
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="user-info">
        <h3>Ваша адреса</h3>
        <div className="location-container">
          <img src={location} alt="location" className="location-icon" />
          {isEditing ? (
            <div className="address-edit-form">
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Введіть нову адресу"
                className="input-change"
              />
              <button
                className="change-address save"
                onClick={handleSaveAddress}
              >
                Зберегти
              </button>
              <button
                className="change-address cancel-btn"
                onClick={handleCancelEdit}
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <p className="user-location">
                {profileData.location || "Адресу не вказано"}
              </p>
              <button className="change-address" onClick={handleAddressChange}>
                Змінити
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
