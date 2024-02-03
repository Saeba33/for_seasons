import { createFavorite, readAllFavorites } from "@/lib/favorites";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  console.log("Token from cookies:", req.cookies.token);
  try {
    if (method === "GET") {
      const favorites = await readAllFavorites();
      res.status(200).json(favorites);
    } else if (method === "POST") {
      const token = req.cookies.token;
      if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Authentication required" });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
      } catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { recipe_id } = req.body;
      const user_id = decoded.user_id;
      console.log("Creating favorite with:", { recipe_id, user_id });
      const result = await createFavorite({ recipe_id, user_id });
      res.status(201).json({ message: result.message, id: result.id });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("Server error:", error.message);

    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
