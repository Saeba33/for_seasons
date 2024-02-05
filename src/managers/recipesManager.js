import { db } from "../../database/connection";

//C
const createRecipe = async ({
  title,
  photo,
  difficulty,
  duration,
  numberPersons,
  instructions,
  utensils,
  information,
  userId,
}) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO recipes (title, photo, difficulty, duration, number_persons, instructions, utensils, information, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        photo,
        difficulty,
        duration,
        numberPersons,
        instructions,
        utensils,
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

//U
const updateRecipeById = async ({
  title,
  photo,
  difficulty,
  duration,
  numberPersons,
  instructions,
  utensils,
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
    const updatedUtensils = utensils || existingRecipe.utensils;
    const updatedInformation = information || existingRecipe.information;
    const updatedUserId = userId || existingRecipe.user_id;

    const [result] = await db.query(
      "UPDATE recipes SET title = ?, photo = ?, difficulty = ?, duration = ?, number_persons = ?, instructions = ?, utensils = ?, information = ?, user_id = ? WHERE recipe_id = ?",
      [
        updatedTitle,
        updatedPhoto,
        updatedDifficulty,
        updatedDuration,
        updatedNumberPersons,
        updatedInstructions,
        updatedUtensils,
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
  updateRecipeById,
};
