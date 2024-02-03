import { createFavorite, readAllFavorites } from "@/lib/favorites";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const favorites = await readAllFavorites();
      res.status(200).json(favorites);
      break;

    case "POST":
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
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
      const user_id = decoded.userId;
      try {
        const result = await createFavorite({
          recipeId: recipe_id,
          userId: user_id,
        });
        res
          .status(201)
          .json({ message: "Favorite added successfully", id: result.id });
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
