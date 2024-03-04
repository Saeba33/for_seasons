import {
  createProduct,
  readAllProducts,
  readProductsByMonth,
} from "@/managers/productsManager";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    if (method === "GET") {
      const { month } = query;
      let products;
      if (month) {
        products = await readProductsByMonth(month);
      } else {
        products = await readAllProducts();
      }
      res.status(200).json(products);
    } else if (method === "POST") {
      const { name, category, picture, description } = req.body;
      const result = await createProduct({
        name,
        category,
        picture,
        description,
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
