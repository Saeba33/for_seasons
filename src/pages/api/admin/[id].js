import {
  deleteAdminProduct,
  readAdminProductById,
  updateAdminProduct,
} from "@/managers/adminManager";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const product = await readAdminProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const product = await updateAdminProduct({ ...req.body, product_id: id });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const message = await deleteAdminProduct(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
