import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";
import Hide from "../assets/images/input/Hide.png";
import useLogin from "../viewmodels/useLogin";

const Login = () => {
  const { login, error } = useLogin();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) {
      window.location.href = "/menu";
    }
  };

  return (
    <div className="page-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Вітаю</h1>
          <h2>Ласкаво просимо назад</h2>

          <label htmlFor="username">Пошта</label>
          <input
            type="text"
            name="username"
            placeholder="Ваша пошта"
            className="email"
            value={form.username}
            onChange={handleChange}
          />

          <div className="password-wrapper">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Напишіть свій пароль"
              className="password"
              value={form.password}
              onChange={handleChange}
            />
            <span>
              <img src={Hide} alt="hide eye" className="hideEye" />
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <Link className="link" to="/reset">
            Забув пароль?
          </Link>
          <Button value="Увійти" typeButton="submit" />

          <div className="redirect">
            <p>Не маєте акаунту?</p>
            <Link to="/register" className="redirect-link">
              Реєстрація
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
