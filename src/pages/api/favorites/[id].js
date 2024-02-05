import {
  checkIfFavorite,
  deleteFavoriteById,
  readFavoriteById,
} from "@/managers/favoritesManager";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const {
    method,
    query: { id: recipeId },
    headers,
  } = req;

  const authHeader = headers.authorization;
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
  const userId = decoded.userId;

  switch (method) {
    case "GET":
      try {
        const favorite = await readFavoriteById(recipeId, userId);
        res.status(200).json(favorite);
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
      break;

    case "DELETE":
      try {
        const isFavorite = await checkIfFavorite(userId, recipeId);
        if (!isFavorite) {
          return res.status(404).json({ message: "Favorite not found" });
        }
        await deleteFavoriteById(recipeId, userId);
        res.status(200).json({ message: "Favorite deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
