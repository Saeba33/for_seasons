import { db } from "@/database/connection";

//C
const createRecipe = async ({
  title,
  photo,
  difficulty,
  duration,
  numberPersons,
  instructions,
  ustensils,
  information,
  userId,
}) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO recipes (title, photo, difficulty, duration, number_persons, instructions, ustensils, information, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        photo,
        difficulty,
        duration,
        numberPersons,
        instructions,
        ustensils,
        information,
        userId,
      ]
    );
    return {
      message: `Recipe successfully created with ID: ${rows.insertId}.`,
      id: rows.insertId,
    };
  } catch (err) {
    throw new Error(`Error creating recipe: ${err.message}`);
  }
};

//R
const readAllRecipes = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM recipes");
    return rows;
  } catch (err) {
    throw new Error("Failed to retrieve recipes. There was a server error.");
  }
};

const readRecipeById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM recipes WHERE recipe_id = ?", [
      id,
    ]);
    if (rows.length === 0) throw new Error(`No recipe found with ID: ${id}`);
    return rows[0];
  } catch (err) {
    throw new Error(`Failed to retrieve recipe with ID: ${id}. ${err.message}`);
  }
};

const readRecipesByProduct = async (productId) => {
  try {
    const [rows] = await db.query(
      `SELECT DISTINCT recipes.* 
       FROM recipes
       JOIN recipes_products_quantities ON recipes.recipe_id = recipes_products_quantities.recipe_id
       WHERE recipes_products_quantities.product_id = ?`,
      [productId]
    );
    return rows;
  } catch (err) {
    console.error(
      `Failed to retrieve recipes containing product ${err.message}`
    );
    return [];
  }
};

//U
const updateRecipeById = async ({
  title,
  photo,
  difficulty,
  duration,
  numberPersons,
  instructions,
  ustensils,
  information,
  userId,
  id,
}) => {
  try {
    const existingRecipe = await readRecipeById(id);
    const updatedTitle = title || existingRecipe.title;
    const updatedPhoto = photo || existingRecipe.photo;
    const updatedDifficulty = difficulty || existingRecipe.difficulty;
    const updatedDuration = duration || existingRecipe.duration;
    const updatedNumberPersons = numberPersons || existingRecipe.number_persons;
    const updatedInstructions = instructions || existingRecipe.instructions;
    const updatedustensils = ustensils || existingRecipe.ustensils;
    const updatedInformation = information || existingRecipe.information;
    const updatedUserId = userId || existingRecipe.user_id;

    const [result] = await db.query(
      "UPDATE recipes SET title = ?, photo = ?, difficulty = ?, duration = ?, number_persons = ?, instructions = ?, ustensils = ?, information = ?, user_id = ? WHERE recipe_id = ?",
      [
        updatedTitle,
        updatedPhoto,
        updatedDifficulty,
        updatedDuration,
        updatedNumberPersons,
        updatedInstructions,
        updatedustensils,
        updatedInformation,
        updatedUserId,
        id,
      ]
    );
    return {
      message: `Recipe with ID: ${id} successfully updated.`,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    throw new Error(`Failed to update recipe with ID: ${id}. ${err.message}`);
  }
};

//D
const deleteRecipeById = async (id) => {
  try {
    const [rows] = await db.query("DELETE FROM recipes WHERE recipe_id = ?", [
      id,
    ]);
    return { message: `Recipe with ID: ${id} successfully deleted.` };
  } catch (err) {
    throw new Error(`Failed to delete recipe with ID: ${id}. ${err.message}`);
  }
};

export {
  createRecipe,
  deleteRecipeById,
  readAllRecipes,
  readRecipeById,
  readRecipesByProduct,
  updateRecipeById,
};
