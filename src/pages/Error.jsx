import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main>
        <div className="page-container">
          <div className="error">
            <p className="error-status">404</p>
            <p className="error-text">
              Упс... трапилась помилка, цієї сторінки не існує :(
            </p>
            <div className="primary-button error-button">
              <Link className="link-error" to="/">
                Повернутися
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <p>Відбулася помилка</p>
    </main>
  );
};

export default Error;
