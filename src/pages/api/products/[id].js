import {
  deleteProductById,
  readProductById,
  updateProductById,
} from "@/managers/productsManager";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === "GET") {
      const product = await readProductById(id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `No product found with ID: ${id}.` });
      }
      res.status(200).json(product);
    } else if (method === "PUT") {
      const updatePayload = req.body;
      const updatedProduct = await updateProductById({ id, ...updatePayload });

      if (!updatedProduct.affectedRows || updatedProduct.affectedRows === 0) {
        return res.status(404).json({
          message: `Product with ID: ${id} not found or update data was identical.`,
        });
      }
      res.status(200).json({
        message: `Product with ID: ${id} successfully updated.`,
        updatedFields: updatePayload,
      });
    } else if (method === "DELETE") {
      const deletedProduct = await deleteProductById(id);
      if (!deletedProduct.affectedRows || deletedProduct.affectedRows === 0) {
        return res.status(404).json({
          message: `Product with ID: ${id} successfully deleted.`,
        });
      }
      res
        .status(200)
        .json({ message: `Product with ID: ${id} successfully deleted.` });
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
