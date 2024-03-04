import {
  createAdminProduct,
  readAdminProducts,
} from "@/managers/adminProductsManager";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await readAdminProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const product = await createAdminProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
