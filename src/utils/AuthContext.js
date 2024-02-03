"use client";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [recipeId, setRecipeId] = useState(null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    setUserProfile,
    userId,
    setUserId,
    recipeId,
    setRecipeId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
