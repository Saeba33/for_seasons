import { db } from "../../migrations/db";

//C
const createFavorite = async ({ recipe_id, user_id }) => {
    try {
        const [rows] = await db.query(
            "INSERT INTO favorites (recipe_id, user_id) VALUES (?, ?)",
            [recipe_id, user_id]
        );
        return {
            message: `Favorite successfully created with ID: ${rows.insertId}.`,
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

const readFavoriteById = async (id) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM favorites WHERE favorite_id = ?",
            [id]
        );
        if (rows.length === 0) throw new Error(`No favorite found with ID: ${id}`);
        return rows[0];
    } catch (err) {
        throw new Error(
            `Failed to retrieve favorite with ID: ${id}. ${err.message}`
        );
    }
};

//U
const updateFavoriteById = async ({ recipe_id, user_id, id }) => {
    try {
        const existingFavorite = await readFavoriteById(id);
        const updatedRecipeId = recipe_id || existingFavorite.recipe_id;
        const updatedUserId = user_id || existingFavorite.user_id;

        const [result] = await db.query(
            "UPDATE favorites SET recipe_id = ?, user_id = ? WHERE favorite_id = ?",
            [updatedRecipeId, updatedUserId, id]
        );
        return {
            message: `Favorite with ID: ${id} successfully updated.`,
            affectedRows: result.affectedRows,
        };
    } catch (err) {
        throw new Error(`Failed to update favorite with ID: ${id}. ${err.message}`);
    }
};

//D
const deleteFavoriteById = async (id) => {
    try {
        const [rows] = await db.query("DELETE FROM favorites WHERE favorite_id = ?", [
            id,
        ]);
        return { message: `Favorite with ID: ${id} successfully deleted.` };
    } catch (err) {
        throw new Error(`Failed to delete favorite with ID: ${id}. ${err.message}`);
    }
};

export {
    createFavorite,
    readAllFavorites,
    readFavoriteById,
    updateFavoriteById,
    deleteFavoriteById,
};