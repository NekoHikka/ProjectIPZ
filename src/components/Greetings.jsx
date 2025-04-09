import { useEffect, useState } from "react";
import axios from "axios";

const Greetings = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Спочатку перевіряємо, чи є ім'я користувача в localStorage
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Якщо немає, робимо запит до API
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        try {
          const res = await axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedUsername = res.data.username;
          setUsername(fetchedUsername);
          localStorage.setItem("username", fetchedUsername);
        } catch (error) {
          console.error("Помилка при завантаженні профілю", error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  return (
    <div className="greetingP">
      <h2>Привіт, {username || "User"}!</h2>
    </div>
  );
};

export default Greetings;
