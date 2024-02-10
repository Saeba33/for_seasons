import bcrypt from "bcryptjs";
import { db } from "@/database/connection";

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  } catch (err) {
    throw new Error("Failed to get user by email");
  }
};

const createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);
  } catch (err) {
    throw new Error("Failed to create user");
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("Utilisateur non trouvé");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Mot de passe incorrect");
    return user;
  } catch (err) {
    console.error(err.message);
    throw new Error("Echec de la connexion");
  }
};

export { createUser, getUserByEmail, loginUser };
