import notifiction from "../assets/images/notification.svg";
import defaultAvatar from "../assets/images/default-avatar.svg";
import location from "../assets/images/location.svg";
import { useProfileViewModel } from "../viewmodels/useProfile";

const PersonalCabinet = () => {
  const {
    profileData,
    loading,
    isEditing,
    newAddress,
    setNewAddress,
    setIsEditing,
    handleSaveAddress,
    handleLogout,
    showMenu,
    setShowMenu,
    menuRef,
  } = useProfileViewModel();

  const handleAddressChange = () => {
    setNewAddress(profileData.location || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewAddress(profileData.location);
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
