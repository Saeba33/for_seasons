import { connectToDb, db } from "@/database/connection";

//C
const createIngredient = async (recipeId, productId, quantity, unit) => {
  const connection = await connectToDb();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query(
      "INSERT INTO recipes_products_quantities (recipe_id, product_id, quantity, unit) VALUES (?, ?, ?, ?)",
      [recipeId, productId, quantity, unit]
    );
    await connection.commit();
    return {
      message: `Ingredient successfully added to recipe with ID: ${recipeId}.`,
      id: rows.insertId,
    };
  } catch (err) {
    await connection.rollback();
    console.error(`Erreur lors de la création de l'ingrédient: ${err.message}`);
    throw new Error(`Error creating ingredient: ${err.message}`);
  } finally {
    connection.release();
  }
};

//R
const readIngredientsByRecipeId = async (recipeId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM recipes_products_quantities WHERE recipe_id = ?",
      [recipeId]
    );
    return rows;
  } catch (err) {
    throw new Error(
      `Failed to retrieve ingredients for recipe with ID: ${recipeId}. ${err.message}`
    );
  }
};

//U
const updateIngredientById = async (
  ingredientId,
  recipeId,
  productId,
  quantity,
  unit
) => {
  try {
    const [result] = await db.query(
      "UPDATE recipes_products_quantities SET quantity = ?, unit = ?, product_id = ? WHERE quantity_id = ? AND recipe_id = ?",
      [quantity, unit, productId, ingredientId, recipeId]
    );
    return {
      message: `Ingredient with ID: ${ingredientId} successfully updated.`,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    console.error(
      `Erreur lors de la mise à jour de l'ingrédient : ${err.message}`
    );
    throw new Error(
      `Failed to update ingredient with ID: ${ingredientId}. ${err.message}`
    );
  }
};

//D
const deleteIngredientById = async (ingredientId) => {
  try {
    const [rows] = await db.query(
      "DELETE FROM recipes_products_quantities WHERE quantity_id = ?",
      [ingredientId]
    );
    return {
      message: `Ingredient with ID: ${ingredientId} successfully deleted.`,
    };
  } catch (err) {
    throw new Error(
      `Failed to delete ingredient with ID: ${ingredientId}. ${err.message}`
    );
  }
};

export {
  createIngredient,
  deleteIngredientById,
  readIngredientsByRecipeId,
  updateIngredientById,
};
