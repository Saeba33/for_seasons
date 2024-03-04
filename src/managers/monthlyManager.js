import { db } from "@/database/connection";

// C
const createProductOfMonth = async ({ month, productId, featured }) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO products_of_month (month, product_id, featured) VALUES (?, ?, ?)",
      [month, productId, featured]
    );
    return {
      message: `Product of the month successfully created with ID: ${rows.insertId}.`,
      id: rows.insertId,
    };
  } catch (err) {
    throw new Error(`Error creating product of the month: ${err.message}`);
  }
};

// R
const readAllProductsOfMonth = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products_of_month");
    return rows;
  } catch (err) {
    throw new Error(
      "Failed to retrieve products of the month. There was a server error."
    );
  }
};

const readProductOfMonthById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products_of_month WHERE product_of_month_id = ?",
      [id]
    );
    if (rows.length === 0)
      throw new Error(`No product of the month found with ID: ${id}`);
    return rows[0];
  } catch (err) {
    throw new Error(
      `Failed to retrieve product of the month with ID: ${id}. ${err.message}`
    );
  }
};

// U
const updateProductOfMonthById = async ({ month, productId, featured, id }) => {
  try {
    const [result] = await db.query(
      "UPDATE products_of_month SET month = ?, product_id = ?, featured = ? WHERE product_of_month_id = ?",
      [month, productId, featured, id]
    );
    return {
      message: `Product of the month with ID: ${id} successfully updated.`,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    throw new Error(
      `Failed to update product of the month with ID: ${id}. ${err.message}`
    );
  }
};

// D
const deleteProductOfMonthById = async (id) => {
  try {
    const [rows] = await db.query(
      "DELETE FROM products_of_month WHERE product_of_month_id = ?",
      [id]
    );
    return {
      message: `Product of the month with ID: ${id} successfully deleted.`,
    };
  } catch (err) {
    throw new Error(
      `Failed to delete product of the month with ID: ${id}. ${err.message}`
    );
  }
};

export {
  createProductOfMonth,
  deleteProductOfMonthById,
  readAllProductsOfMonth,
  readProductOfMonthById,
  updateProductOfMonthById,
};
