"use client";

import AuthContext from "@/utils/AuthContext"; // Ajustez le chemin si nécessaire
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Ajoutez setAuthToken à la déconstruction ici
  const { setIsLoggedIn, setUserId, setAuthToken } = useContext(AuthContext);
  console.log(useContext(AuthContext));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token); // Continuez à stocker le token dans localStorage pour la persistance
      const decodedToken = jwt.decode(data.token);
      console.log(decodedToken);
      setUserId(decodedToken.userId); // Assurez-vous que cette clé correspond à votre structure de token
      setAuthToken(data.token);
      setAuthToken;
      // Mettez à jour le contexte avec le token JWT
      window.location.href = "/"; // Rediriger l'utilisateur après une connexion réussie
    } catch (error) {
      console.error(
        "A problem occurred when trying to reach the server:",
        error
      );
      setError("A network error occurred");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
