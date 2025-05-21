import { Outlet } from "react-router-dom";
import { Navbar, Greetings, Search, Categories } from "../components";
import UserPanel from "./UserPanel";
import { SearchProvider } from "../utils/SearchContext";

const HomeLayout = () => {
  return (
    <SearchProvider>
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
    </SearchProvider>
  );
};

export default HomeLayout;
