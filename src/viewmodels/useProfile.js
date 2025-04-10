import { useEffect, useState, useRef } from "react";
import { getProfile, updateLocation } from "../api/profile";

export const useProfileViewModel = () => {
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
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getProfile(token);
        const profileImagePath = res.data.profile_image
          ? `${baseURL}${res.data.profile_image}`
          : null;

        setProfileData({
          username: res.data.username,
          location: res.data.location,
          profileImage: profileImagePath,
        });

        localStorage.setItem("username", res.data.username);
        if (profileImagePath) {
          localStorage.setItem("profileImage", profileImagePath);
        }
      } catch (e) {
        console.error("Помилка при завантаженні профілю:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await updateLocation(newAddress, token);
      setProfileData((prev) => ({ ...prev, location: res.data.location }));
      setIsEditing(false);
    } catch (err) {
      console.error("Помилка при оновленні адреси:", err);
      alert("Не вдалося зберегти адресу.");
    }
  };

  return {
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
  };
};
