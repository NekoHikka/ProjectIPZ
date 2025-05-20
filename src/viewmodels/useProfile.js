import { useEffect, useState, useRef } from "react";
import { getProfile, updateLocation, updateProfileImage } from "../api/profile";

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
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);
  const menuRef = useRef(null);
  const baseURL = "http://127.0.0.1:8000";

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const changePhoto = () => {
    setIsChangePhotoOpen(true);
  };

  const closeChangePhoto = () => {
    setIsChangePhotoOpen(false);
    setSelectedFile(null);
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Обраний файл:", file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      alert("Будь ласка, виберіть файл для завантаження");
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) {
      alert("Для завантаження фото потрібна авторизація");
      return;
    }

    setUploadingPhoto(true);
    try {
      const response = await updateProfileImage(selectedFile, token);
      const newImagePath = response.data.profile_image
        ? `${baseURL}${response.data.profile_image}`
        : null;

      setProfileData((prev) => ({
        ...prev,
        profileImage: newImagePath,
      }));

      if (newImagePath) {
        localStorage.setItem("profileImage", newImagePath);
      }

      closeChangePhoto();
      alert("Фото профілю успішно оновлено");
    } catch (error) {
      console.error("Помилка при завантаженні фото:", error);
      alert("Не вдалося завантажити фото. Спробуйте ще раз.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await updateLocation(
        newAddress,
        50.4501, //тимчасово
        30.5234, //тимчасово
        token
      );
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
    isChangePhotoOpen,
    changePhoto,
    closeChangePhoto,
    showMenu,
    setShowMenu,
    menuRef,
    handleFileClick,
    handleFileChange,
    selectedFile,
    fileInputRef,
    handleUploadPhoto,
    uploadingPhoto,
  };
};
