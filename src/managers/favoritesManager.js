import { db } from "../../database/connection";

//C
const createFavorite = async ({ recipeId, userId }) => {
  try {
    const favoriteExists = await checkIfFavorite(userId, recipeId);
    if (favoriteExists) {
      return { message: "Recipe is already a favorite.", id: null };
    }
    const [rows] = await db.query(
      "INSERT INTO favorites (recipe_id, user_id) VALUES (?, ?)",
      [recipeId, userId]
    );
    return {
      message: "Favorite successfully created.",
      id: rows.insertId,
    };
  } catch (err) {
    throw new Error(`Error creating favorite: ${err.message}`);
  }
};

//R
const readAllFavorites = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM favorites");
    return rows;
  } catch (err) {
    throw new Error("Failed to retrieve favorites. There was a server error.");
  }
};

const readFavoriteById = async (recipeId, userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM favorites WHERE recipe_id = ? AND user_id = ?",
      [recipeId, userId]
    );
    if (rows.length === 0)
      throw new Error(`No favorite found with ID: ${recipeId}`);
    return rows[0];
  } catch (err) {
    throw new Error(
      `Failed to retrieve favorite with ID: ${recipeId}. ${err.message}`
    );
  }
};

const readFavoritesByUserId = async (userId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT * FROM recipes
      INNER JOIN favorites ON favorites.recipe_id = recipes.recipe_id
      WHERE favorites.user_id = ?
    `,
      [userId]
    );

    return rows;
  } catch (err) {
    throw new Error(
      "Failed to retrieve favorites for the user. There was a server error."
    );
  }
};

//D
const deleteFavoriteById = async (recipeId, userId) => {
  try {
    const [result] = await db.query(
      "DELETE FROM favorites WHERE recipe_id = ? AND user_id = ?",
      [recipeId, userId]
    );

    if (result.affectedRows === 0) {
      return { message: "No favorite found or already deleted." };
    }

    return { message: "Favorite successfully deleted." };
  } catch (err) {
    throw new Error(`Failed to delete favorite: ${err.message}`);
  }
};

//Check function
const checkIfFavorite = async (userId, recipeId) => {
  try {
    const [rows] = await db.query(
      "SELECT favorite_id FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

export {
  checkIfFavorite,
  createFavorite,
  deleteFavoriteById,
  readAllFavorites,
  readFavoriteById,
  readFavoritesByUserId,
};
