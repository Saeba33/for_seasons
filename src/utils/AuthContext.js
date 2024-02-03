"use client";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    setUserProfile,
    userId,
    setUserId,
    recipeId,
    setRecipeId,
    authToken,
    setAuthToken,
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
        userId,
        setUserId,
        recipeId,
        setRecipeId,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
