import bcrypt from "bcryptjs";
import { db } from "../../../migrations/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
    return;
  }

  try {
     const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await db.getConnection();
    const [result] = await connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ success: false, message: "Email already exists" });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}
