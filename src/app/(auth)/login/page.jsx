"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./login.module.css";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

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
        setError(errorData.message || "Identifiants invalides");
        return;
      }
      const data = await response.json();
      const { token, profile } = data;
      login(token, profile);
    } catch (error) {
      setError(
        "Un problème est survenu lors de la connexion au serveur."
      );
    }
  };

  return (
    <div className={styles.container}>
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
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        {error && <div>{error}</div>}
        <Link href="/register">
          {"Pas de compte ?"}{" "}
          <span className={styles.register}>S&apos;enregistrer</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
