import { Link, useNavigate } from "react-router-dom";
import Hide from "../assets/images/input/Hide.png";
import useRegister from "../viewmodels/useRegister";
import { useState } from "react";

const Register = () => {
  const { register, error } = useRegister();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const result = await register(username, password, email);
    if (result) {
      navigate("/login"); // перенаправлення після успіху
    } else {
      setFormError("Не вдалося зареєструватися");
    }
  };

  return (
    <div className="page-container">
      <form method="post" className="register-form" onSubmit={handleRegister}>
        <div className="container">
          <h1>Реєстрація</h1>

          <div className="input-group">
            <label htmlFor="name">Логін</label>
            <input
              type="text"
              name="username"
              placeholder="Напишіть ваш логін"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Пошта</label>
            <input
              type="email"
              name="email"
              placeholder="example.email@gmail.com"
              required
            />
          </div>

          <div className="password-wrapper">
            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                name="password"
                placeholder="Мінімум 8 знаків у паролі"
                required
              />
            </div>
            <span>
              <img src={Hide} alt="hide eye" className="hideEyeR" />
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}
          {formError && <p className="error-message">{formError}</p>}

          <button type="submit" className="primary-button submitRegister">
            Зареєструватися
          </button>

          <div className="redirect redirect-r">
            <p>Ви вже маєте акаунт?</p>
            <Link to="/login" className="redirect-link">
              Увійти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
