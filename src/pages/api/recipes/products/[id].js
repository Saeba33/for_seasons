import { readRecipesByProduct } from "@/managers/recipesManager";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { id, type } = query;

  try {
    if (method === "GET") {
      if (type === "type2") {
        const recipes = await readRecipesByProduct(id);
        if (!recipes || recipes.length === 0) {
          return res
            .status(404)
            .json({ message: `No recipes found for product ID: ${id}.` });
        }
        res.status(200).json(recipes);
      } else {
        res.status(400).json({
          message: "Invalid request. Please specify a valid 'type' parameter.",
        });
      }
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
