import jwt from "jsonwebtoken";
import { createFavorite, readAllFavorites } from "@/lib/favorites";

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      const favorites = await readAllFavorites();
      res.status(200).json(favorites);
    } else if (method === "POST") {

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      let decoded;
      try {

        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { recipe_id } = req.body;
      const user_id = decoded.user_id;
      const result = await createFavorite({ recipe_id, user_id });
      res.status(201).json({ message: result.message, id: result.id });
    } else {

      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {

    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
