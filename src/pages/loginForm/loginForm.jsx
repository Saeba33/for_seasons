"use client";

import jwt from "jsonwebtoken";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthContext from "../../utils/AuthContext";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsLoggedIn, setUserId } = useContext(AuthContext);

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
      localStorage.setItem("token", data.token);
      const decodedToken = jwt.decode(data.token);
      setUserId(decodedToken.user_id);
      console.log("User ID:", decodedToken.user_id);
      window.location.href = "/";
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
