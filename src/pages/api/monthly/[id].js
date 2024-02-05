import {
  deleteProductOfMonthById,
  readProductOfMonthById,
  updateProductOfMonthById,
} from "@/managers/monthlyManager";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === "GET") {
      const productOfMonth = await readProductOfMonthById(id);
      if (!productOfMonth) {
        return res
          .status(404)
          .json({ message: `No product of the month found with ID: ${id}.` });
      }
      res.status(200).json(productOfMonth);
    } else if (method === "PUT") {
      const { month, product_id, featured } = req.body;
      const updatedProductOfMonth = await updateProductOfMonthById({
        id,
        month,
        product_id,
        featured,
      });

      if (
        !updatedProductOfMonth.affectedRows ||
        updatedProductOfMonth.affectedRows === 0
      ) {
        return res.status(404).json({
          message: `Product of the month with ID: ${id} not found or update data was identical.`,
        });
      }
      res.status(200).json({
        message: `Product of the month with ID: ${id} successfully updated.`,
        updatedFields: { month, product_id, featured },
      });
    } else if (method === "DELETE") {
      const deletedProductOfMonth = await deleteProductOfMonthById(id);
      if (
        !deletedProductOfMonth.affectedRows ||
        deletedProductOfMonth.affectedRows === 0
      ) {
        return res.status(404).json({
          message: `Product of the month with ID: ${id} not found.`,
        });
      }
      res.status(200).json({
        message: `Product of the month with ID: ${id} successfully deleted.`,
      });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
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
