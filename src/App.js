import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthGate from "./features/auth/pages/AuthGate";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  const { accessToken, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!accessToken,
        accessToken: accessToken,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <ToastContainer hideProgressBar autoClose={2000} limit={1} />
      <Router>
        <MainNavigation />
        <div className="w-full items-center justify-center flex pt-20">
          <AuthGate />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
