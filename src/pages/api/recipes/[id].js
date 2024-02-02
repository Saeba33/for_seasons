import {
  readRecipeById,
  updateRecipeById,
  deleteRecipeById,
} from "@/lib/recipes";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    try {
        if (method === "GET") {
            const recipe = await readRecipeById(id);
            if (!recipe) {
                return res
                    .status(404)
                    .json({ message: `No recipe found with ID: ${id}.` });
            }
            res.status(200).json(recipe);
        } else if (method === "PUT") {
            const updatePayload = req.body;
            const updatedRecipe = await updateRecipeById({ id, ...updatePayload });

            if (!updatedRecipe.affectedRows || updatedRecipe.affectedRows === 0) {
                return res.status(404).json({
                    message: `Recipe with ID: ${id} not found or update data was identical.`,
                });
            }
            res.status(200).json({
                message: `Recipe with ID: ${id} successfully updated.`,
                updatedFields: updatePayload,
            });
        } else if (method === "DELETE") {
            const deletedRecipe = await deleteRecipeById(id);
            if (!deletedRecipe.affectedRows || deletedRecipe.affectedRows === 0) {
                return res.status(404).json({
                    message: `Recipe with ID: ${id} not found.`,
                });
            }
            res
                .status(200)
                .json({ message: `Recipe with ID: ${id} successfully deleted.` });
        } else {
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