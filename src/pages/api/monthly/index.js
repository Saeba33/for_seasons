import { createProductOfMonth, readAllProductsOfMonth } from "@/lib/monthly";

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      const monthlyProducts = await readAllProductsOfMonth();
      res.status(200).json(monthlyProducts);
    } else if (method === "POST") {
      const { month, product_id, featured } = req.body;
      const result = await createProductOfMonth({
        month,
        product_id,
        featured,
      });
      res.status(201).json({ message: result.message, id: result.id });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
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
