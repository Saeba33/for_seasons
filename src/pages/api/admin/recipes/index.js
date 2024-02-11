import {
  createAdminRecipe,
  readAdminRecipes,
} from "@/managers/adminRecipesManager";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const recipes = await readAdminRecipes();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const recipe = await createAdminRecipe(req.body);
        res.status(201).json(recipe);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
