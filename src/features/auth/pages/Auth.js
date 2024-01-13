import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true);
  const handleSwitchMode = () => {
    setLoginMode((prev) => !prev);
  };
  return (
    <div className="flex-col w-3/5 flex items-center justify-center">
      {loginMode ? <Login /> : <Signup />}
      <div className="w-2/5 flex justify-center mt-5">
        <button
          className="rounded-lg px-4 py-2 bg-red-500 text-blue-100 hover:bg-blue-600 duration-300"
          onClick={handleSwitchMode}
        >
          {`Switch to ${loginMode ? "Signup" : "Login"}`}{" "}
        </button>
      </div>
    </div>
  );
};

export default Auth;
