import {
  deleteAdminRecipe,
  readAdminRecipeById,
  updateAdminRecipe,
} from "@/managers/adminRecipesManager";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const recipe = await readAdminRecipeById(id);
        res.status(200).json(recipe);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "PUT":
      try {
        const recipe = await updateAdminRecipe({ ...req.body, recipe_id: id });
        res.status(200).json(recipe);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const message = await deleteAdminRecipe(id);
        res.status(200).json({ message });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
