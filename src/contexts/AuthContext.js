import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  authToken: null,
  userId: null,
  isAdmin: false,
  selectedProduct: null,
  login: () => {},
  logout: () => {},
  setSelectedProduct: () => {},
  clearSelectedProduct: () => {},
});

export const useAdminAccess = () => {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        setIsLoggedIn(true);
        setAuthToken(token);
        setUserId(decodedToken.userId);
        setIsAdmin(decodedToken.profile === "administrator");
      }
    }
  }, []);

  const login = (token, profile) => {
    Cookies.set("token", token, { expires: 1 / 24, httpOnly: true });
    const decodedToken = jwt.decode(token);
    setIsLoggedIn(true);
    setAuthToken(token);
    setUserId(decodedToken.userId);
    setIsAdmin(profile === "administrator");
    router.push("/");
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setAuthToken(null);
    setUserId(null);
    setIsAdmin(false);
    clearSelectedProduct();
    router.push("/login");
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
        isAdmin,
        selectedProduct,
        login,
        logout,
        setSelectedProduct,
        clearSelectedProduct,
        useAdminAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
