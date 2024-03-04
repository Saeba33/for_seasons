import {
  deleteIngredientById,
  readIngredientsByRecipeId,
  updateIngredientById,
} from "@/managers/adminIngredientsManager";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const ingredients = await readIngredientsByRecipeId(id);
        res.status(200).json(ingredients);
      } catch (error) {
        res
          .status(500)
          .json({ message: `Server error occurred: ${error.message}` });
      }
      break;

    case "PUT":
      const recipeId = req.body.recipe_id;
      const productId = req.body.product_id;
      const quantity = req.body.quantity;
      const label = req.body.label;
      try {
        const result = await updateIngredientById(
          id,
          recipeId,
          productId,
          quantity,
          label
        );
        res.status(200).json(result);
      } catch (error) {
        console.error("Update Error:", error);
        res
          .status(500)
          .json({ message: `Server error occurred: ${error.message}` });
      }
      break;

    case "DELETE":
      try {
        const result = await deleteIngredientById(id);
        res.status(200).json(result);
      } catch (error) {
        console.error("Delete Error:", error);
        res
          .status(500)
          .json({ message: `Server error occurred: ${error.message}` });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
