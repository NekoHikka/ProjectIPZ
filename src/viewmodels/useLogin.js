import { useState } from "react";
import { loginUser } from "../api/auth";

const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      return true;
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Помилка з'єднання з сервером");
      }
      return false;
    }
  };

  return { login, error };
};

export default useLogin;
