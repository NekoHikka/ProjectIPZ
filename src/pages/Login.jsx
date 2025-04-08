import { Link, Form } from "react-router-dom";
import { Button } from "../components/index";
import Hide from "../assets/images/input/Hide.png";
import axios from "axios";

const toLogin = async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  try {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/users/token/",
      data: {
        username: username,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    console.log("Успішний логін! Токен збережено");
    window.location.href = "/menu";
  } catch (error) {
    console.error("Full error object:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      alert(error.response.data.detail || "Помилка авторизації");
    } else if (error.request) {
      console.error("Request was made but no response received");
      alert("Сервер не відповідає. Перевірте з'єднання.");
    } else {
      console.error("Error in setting up request:", error.message);
      alert("Помилка з'єднання з сервером: " + error.message);
    }
  }
};

const Login = () => {
  return (
    <div className="page-container">
      <form className="login-form" method="post" onSubmit={toLogin}>
        <div className="container">
          <h1>Вітаю</h1>
          <h2>Ласкаво просимо назад</h2>
          <label htmlFor="username">Пошта</label>
          <input
            type="text"
            name="username"
            placeholder="Ваша пошта"
            className="email"
          />
          <div className="password-wrapper">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Напишіть свій пароль"
              className="password"
            />
            <span>
              <img src={Hide} alt="hide eye" className="hideEye" />
            </span>
          </div>

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
