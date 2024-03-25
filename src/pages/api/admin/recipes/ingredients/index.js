import { createIngredient } from "@/managers/adminIngredientsManager";

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "POST") {
      const { recipeId, productId, quantity, unit } = req.body;
      const result = await createIngredient(
        recipeId,
        productId,
        quantity,
        unit
      );
      res.status(201).json({ message: result.message, id: result.id });
    } else {
      res.status(405).json({
        message: `Requested method ${method} is not allowed. Please use POST.`,
      });
    }
  } catch (error) {
    console.error(`Erreur serveur: ${error.message}`);
    res.status(500).json({
      message: `Server error occurred: ${error.message}. Please try again later.`,
    });
  }
}
