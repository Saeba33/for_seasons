import { createRecipe, readAllRecipes } from "@/lib/recipes";
import { requireAuth } from "@/lib/middleware";

export default async function handler(req, res) {
    const { method } = req;
    requireAuth(req, res, () => {});
    
    try {
        if (method === "GET") {
            const recipes = await readAllRecipes();
            res.status(200).json(recipes);
        } else if (method === "POST") {
            const { title, photo, difficulty, duration, number_persons, instructions, utensils, information } = req.body;
            const userId = req.user.id;
            const result = await createRecipe({
                title,
                photo,
                difficulty,
                duration,
                number_persons,
                instructions,
                utensils,
                information,
                userId
            });
            res.status(201).json({ message: result.message, id: result.id });
        } else {
            res.status(405).json({
                message: `Requested method ${method} is not allowed. Please use GET or POST.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error occurred: ${error.message}. Please try again later.`,
        });
    }
}