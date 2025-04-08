import { LinksToAuth } from "../components";

const UserPanel = () => {
  return (
    <div className="userPanelContent">
      <LinksToAuth />
      <p className="warningForUser">
        Увійдіть в систему, щоб мати доступ до повної функціональності додатку
      </p>
    </div>
  );
};

export default UserPanel;
