import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  authToken: null,
  setAuthToken: () => {},
  userId: null,
  setUserId: () => {},
  userProfile: null,
  setUserProfile: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwt.decode(token);
      setUserId(decodedToken?.userId);
      setAuthToken(token);
      setUserProfile(localStorage.getItem("userProfile"));
    }
  }, []);

const login = (token, profile) => {
  const decodedToken = jwt.decode(token);
  setIsLoggedIn(true);
  setAuthToken(token);
  setUserId(decodedToken?.userId);
  setUserProfile(decodedToken?.profile);
  localStorage.setItem("token", token);
  localStorage.setItem("userProfile", JSON.stringify(decodedToken?.profile));
  window.location.href = "/";
};

  const logout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    setUserId(null);
    setUserProfile(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    window.location.href = "/login";
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    setUserProfile,
    userId,
    setUserId,
    authToken,
    setAuthToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
