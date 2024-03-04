import { connectToDb, db } from "@/database/connection";

//C
async function createAdminRecipe({
  title,
  photo = null,
  difficulty,
  duration,
  number_persons,
  instructions,
  ustensils,
  information = null,
  user_id,
}) {
  const connection = await connectToDb();
  try {
    await connection.beginTransaction();
    const [recipeResult] = await connection.query(
      "INSERT INTO recipes (title, photo, difficulty, duration, number_persons, instructions, ustensils, information, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        photo,
        difficulty,
        duration,
        number_persons,
        instructions,
        ustensils,
        information,
        user_id,
      ]
    );
    const recipeId = recipeResult.insertId;
    await connection.commit();
    return {
      message: `Recipe successfully created with ID: ${recipeId}.`,
      id: recipeId,
    };
  } catch (error) {
    await connection.rollback();
    console.error("Error creating recipe:", error);
    throw new Error(`Error creating recipe: ${error.message}`);
  } finally {
    connection.release();
  }
}

//R
async function readAdminRecipes() {
  try {
    const [rows] = await db.query(
      "SELECT recipes.recipe_id, recipes.title, recipes.photo, recipes.difficulty, recipes.duration, recipes.number_persons, recipes.instructions, recipes.ustensils, recipes.information, recipes.user_id FROM recipes"
    );
    return rows;
  } catch (err) {
    throw new Error(`Failed to retrieve recipes: ${err.message}`);
  }
}

async function readAdminRecipeById(recipe_id) {
  try {
    const [rows] = await db.query("SELECT * FROM recipes WHERE recipe_id = ?", [
      recipe_id,
    ]);
    if (rows.length === 0)
      throw new Error(`No recipe found with ID: ${recipe_id}`);
    return rows[0];
  } catch (err) {
    throw new Error(
      `Failed to retrieve recipe with ID: ${recipe_id}. ${err.message}`
    );
  }
}

//U
async function updateAdminRecipe({
  recipe_id,
  title,
  photo,
  difficulty,
  duration,
  number_persons,
  instructions,
  ustensils,
  information,
}) {
  const connection = await connectToDb();
  try {
    await connection.beginTransaction();
    await connection.query(
      "UPDATE recipes SET title = ?, photo = ?, difficulty = ?, duration = ?, number_persons = ?, instructions = ?, ustensils = ?, information = ? WHERE recipe_id = ?",
      [
        title,
        photo,
        difficulty,
        duration,
        number_persons,
        instructions,
        ustensils,
        information,
        recipe_id,
      ]
    );
    await connection.commit();
    return { message: `Recipe with ID: ${recipe_id} successfully updated.` };
  } catch (error) {
    await connection.rollback();
    console.error(`Failed to update recipe with ID: ${recipe_id}`, error);
    throw new Error(`Failed to update recipe: ${error.message}`);
  } finally {
    connection.release();
  }
}

//D
async function deleteAdminRecipe(recipe_id) {
  try {
    const [result] = await db.query("DELETE FROM recipes WHERE recipe_id = ?", [
      recipe_id,
    ]);
    if (result.affectedRows === 0) {
      throw new Error(`Recipe with ID: ${recipe_id} not found.`);
    }
    return { message: `Recipe with ID: ${recipe_id} successfully deleted.` };
  } catch (error) {
    throw new Error(`Failed to delete recipe: ${error.message}`);
  }
}

export {
  createAdminRecipe,
  deleteAdminRecipe,
  readAdminRecipeById,
  readAdminRecipes,
  updateAdminRecipe,
};
