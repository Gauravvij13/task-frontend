import { Route, Routes, Navigate } from "react-router-dom";

import React, { useContext } from "react";

import Auth from "./Auth";
import Tasks from "../../task/pages/task";
import { AuthContext } from "../../../shared/context/auth-context";

function AuthGate() {
  const auth = useContext(AuthContext);
  const AuthenticateRoutes = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Tasks />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };

  const UnAuthenticateRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Auth />}></Route>;
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };

  if (auth?.accessToken) {
    return <AuthenticateRoutes />;
  }
  return <UnAuthenticateRoutes />;
}

export default AuthGate;
