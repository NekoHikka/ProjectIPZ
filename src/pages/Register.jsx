import { Link, Form } from "react-router-dom";
import Hide from "../assets/images/input/Hide.png";

const toRegister = () => {
  console.log("Регістрація");
};

const Register = () => {
  return (
    <div className="page-container">
      <Form method="post" className="register-form">
        <div className="container">
          <h1>Реєстрація</h1>
          <div className="name-surname">
            <div className="input-group">
              <label htmlFor="name">Ім'я</label>
              <input
                type="text"
                name="name"
                defaultValue="Напишіть ваше ім'я"
              />
            </div>
            <div className="input-group">
              <label htmlFor="surname">Прізвище</label>
              <input
                type="text"
                name="surname"
                defaultValue="Напишіть ваше прізвище"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Пошта</label>
            <input
              type="email"
              name="email"
              defaultValue="example.email@gmail.com"
            />
          </div>

          <div className="password-wrapper">
            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                name="password"
                defaultValue="Мінімум 8 знаків у паролі"
              />
            </div>
            <span>
              <img src={Hide} alt="hide eye" className="hideEyeR" />
            </span>
          </div>
          <button
            onClick={toRegister}
            type="submit"
            className="primary-button submitRegister"
          >
            Зареєструватися
          </button>

          <div className="redirect redirect-r">
            <p>Ви вже маєте акаунт?</p>
            <Link to="/login" className="redirect-link">
              Увійти
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
