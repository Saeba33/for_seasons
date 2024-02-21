import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  authToken: null,
  userId: null,
  userProfile: null,
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
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setAuthToken(null);
    setUserId(null);
    setUserProfile(null);
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
