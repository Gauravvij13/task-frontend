import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setAccessToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ accessToken: token, _id: uid })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      login(userData?._id, userData?.accessToken);
    }
  }, [login]);
  return { login, logout, accessToken, userId };
};
