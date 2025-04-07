import { Link, Form } from "react-router-dom";
import { Button } from "../components/index";
import Hide from "../assets/images/input/Hide.png";

const toLogin = () => {
  console.log("Логін");
};

const Login = () => {
  return (
    <div className="page-container">
      <Form className="login-form" method="post">
        <div className="container">
          <h1>Вітаю</h1>
          <h2>Ласкаво просимо назад</h2>
          <label htmlFor="email">Пошта</label>
          <input
            type="email"
            name="email"
            defaultValue="Ваша пошта"
            className="email"
          />
          <div className="password-wrapper">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              defaultValue="Напишіть свій пароль"
              className="password"
            />
            <span>
              <img src={Hide} alt="hide eye" className="hideEye" />
            </span>
          </div>

          <Link className="link" to="/reset">
            Забув пароль?
          </Link>
          <Button value="Увійти" fOnClick={toLogin} typeButton="submit" />

          <div className="redirect">
            <p>Не маєте акаунту?</p>
            <Link to="/register" className="redirect-link">
              Реєстрація
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
