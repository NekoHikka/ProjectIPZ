import { Outlet } from "react-router-dom";
import { Navbar, Greetings, Search, Categories } from "../components";
import UserPanel from "./UserPanel";

const HomeLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Greetings />
        <Search />
        <Categories />
        <Outlet />
      </main>
      <UserPanel />
    </div>
  );
};

export default HomeLayout;
