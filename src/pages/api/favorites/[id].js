import {
  deleteFavoriteById,
  readFavoriteById,
  updateFavoriteById,
} from "@/lib/favorites";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === "GET") {
      const favorite = await readFavoriteById(id);
      if (!favorite) {
        return res
          .status(404)
          .json({ message: `No favorite found with ID: ${id}.` });
      }
      res.status(200).json(favorite);
    } else if (method === "PUT") {
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

      const user_id_from_token = decoded.user_id;
      const existingFavorite = await readFavoriteById(id);
      if (!existingFavorite) {
        return res
          .status(404)
          .json({ message: `No favorite found with ID: ${id}` });
      }

      if (existingFavorite.user_id !== user_id_from_token) {
        return res
          .status(403)
          .json({ message: "Unauthorized to update this favorite" });
      }

      const { recipe_id } = req.body;
      const updatePayload = { recipe_id, user_id: user_id_from_token, id };
      const updatedFavorite = await updateFavoriteById(updatePayload);

      if (!updatedFavorite.affectedRows || updatedFavorite.affectedRows === 0) {
        return res.status(404).json({
          message: `Favorite with ID: ${id} not found or update data was identical.`,
        });
      }
      res.status(200).json({
        message: `Favorite with ID: ${id} successfully updated.`,
        updatedFields: updatePayload,
      });
    } else if (method === "DELETE") {
      const deletedFavorite = await deleteFavoriteById(id);
      if (!deletedFavorite.affectedRows || deletedFavorite.affectedRows === 0) {
        return res.status(404).json({
          message: `Favorite with ID: ${id} not found.`,
        });
      }
      res
        .status(200)
        .json({ message: `Favorite with ID: ${id} successfully deleted.` });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({
        message: `Requested method ${method} is not allowed. Please use GET, PUT, or DELETE.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Server error occurred: ${error.message}.`,
    });
  }
}
