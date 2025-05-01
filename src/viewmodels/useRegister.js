import { useState } from "react";
import { registerUser } from "../api/auth";

const useRegister = () => {
  const [error, setError] = useState(null);

  const register = async (username, password, email) => {
    try {
      const data = await registerUser(username, password, email);
      return data;
    } catch (error) {
      if (error.response?.data) {
        setError(error.response.data.detail || "Помилка реєстрації");
      } else {
        setError("Помилка з'єднання з сервером");
      }
      return null;
    }
  };

  return { register, error };
};

export default useRegister;
