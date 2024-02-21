import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  authToken: null,
  userId: null,
  userProfile: null,
  isAdmin: false,
  selectedProduct: null,
  login: () => {},
  logout: () => {},
  setSelectedProduct: () => {},
  clearSelectedProduct: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        setIsLoggedIn(true);
        setAuthToken(token);
        setUserId(decodedToken.userId);
        setUserProfile(decodedToken.profile);
        setIsAdmin(decodedToken.profile === "administrator");
      }
    }
  }, []);

  const login = (token, profile) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    const decodedToken = jwt.decode(token);
    setIsLoggedIn(true);
    setAuthToken(token);
    setUserId(decodedToken.userId);
    setUserProfile(profile);
    setIsAdmin(profile === "administrator");
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setAuthToken(null);
    setUserId(null);
    setUserProfile(null);
    setIsAdmin(false);
    clearSelectedProduct();
    window.location.href = "/login";
  };

  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authToken,
        userId,
        userProfile,
        isAdmin,
        selectedProduct,
        login,
        logout,
        setSelectedProduct,
        clearSelectedProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
