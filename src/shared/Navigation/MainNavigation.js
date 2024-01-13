import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  return (
    <header className="fixed w-full z-50 top-0">
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/auth">
            {" "}
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Task Management
            </span>
          </Link>

          <div
            class=" justify-between items-center w-full lg:flex lg:w-auto "
            id="mobile-menu-2"
          ></div>
          {auth.isLoggedIn && (
            <button className="text-slate-300" onClick={auth?.logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
export default MainNavigation;
