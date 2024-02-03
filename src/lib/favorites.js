import { db } from "../../migrations/db";

//C
const createFavorite = async ({ recipeId, userId }) => {
    try {
        const [rows] = await db.query(
            "INSERT INTO favorites (recipe_id, user_id) VALUES (?, ?)",
            [recipeId, userId]
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
    deleteFavoriteById,
};