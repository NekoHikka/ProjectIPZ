import { Outlet } from "react-router-dom";
import { Navbar, Greetings, Search, Categories } from "../components";

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
    </div>
  );
};

export default HomeLayout;
