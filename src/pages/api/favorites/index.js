import {
  checkIfFavorite,
  createFavorite,
  readFavoritesByUserId,
} from "@/lib/favorites";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
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

      const userId = decoded.userId;

      try {
        const favorites = await readFavoritesByUserId(userId);
        res.status(200).json(favorites);
      } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
      }
      break;
    }
    case "POST": {
      const authHeaderPost = req.headers.authorization;
      const tokenPost = authHeaderPost && authHeaderPost.split(" ")[1];
      if (!tokenPost) {
        return res.status(401).json({ message: "Authentication required" });
      }

      let decodedPost;
      try {
        decodedPost = jwt.verify(tokenPost, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const userIdPost = decodedPost.userId;
      const { recipeId } = req.body;

      try {
        const alreadyFavorite = await checkIfFavorite(userIdPost, recipeId);
        if (alreadyFavorite) {
          return res
            .status(409)
            .json({ message: "Recipe is already a favorite" });
        }

        const result = await createFavorite({ recipeId, userId: userIdPost });
        res
          .status(201)
          .json({ message: "Favorite added successfully", id: result.id });
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
