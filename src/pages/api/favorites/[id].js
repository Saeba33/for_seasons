import { deleteFavoriteById, readFavoriteById } from "@/lib/favorites";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
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
  switch (method) {
    case "GET":
      const favorite = await readFavoriteById(id);
      if (!favorite) {
        return res
          .status(404)
          .json({ message: `No favorite found with ID: ${id}.` });
      }
      res.status(200).json(favorite);
      break;

    case "DELETE":
      try {
        const result = await deleteFavoriteById(id);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(200).json({ message: "Favorite deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
