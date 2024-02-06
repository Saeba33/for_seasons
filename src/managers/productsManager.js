import { db } from "@/database/connection";

//C
const createProduct = async ({ name, category, picture, description }) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO products (name, category, picture, description) VALUES (?, ?, ?, ?)",
      [name, category, picture, description]
    );
    return {
      message: `Product successfully created with ID: ${rows.insertId}.`,
      id: rows.insertId,
    };
  } catch (err) {
    throw new Error(`Error creating product: ${err.message}`);
  }
};

//R
const readAllProducts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  } catch (err) {
    throw new Error("Failed to retrieve products. There was a server error.");
  }
};

const readProductById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
    if (rows.length === 0) throw new Error(`No product found with ID: ${id}`);
    return rows[0];
  } catch (err) {
    throw new Error(
      `Failed to retrieve product with ID: ${id}. ${err.message}`
    );
  }
};

const readProductsByMonth = async (month) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM products JOIN products_of_month ON products.product_id = products_of_month.product_id WHERE products_of_month.month = ?`,
      [month]
    );
    if (rows.length === 0)
      throw new Error(`No product of the month found for month: ${month}`);
    return rows;
  } catch (err) {
    throw new Error(
      `Failed to retrieve product of the month for month: ${month}. ${err.message}`
    );
  }
};

//U
const updateProductById = async ({
  name,
  category,
  picture,
  description,
  id,
}) => {
  try {
    const existingProduct = await readProductById(id);
    const updatedName = name || existingProduct.name;
    const updatedCategory = category || existingProduct.category;
    const updatedPicture = picture || existingProduct.picture;
    const updatedDescription = description || existingProduct.description;

    const [result] = await db.query(
      "UPDATE products SET name = ?, category = ?, picture = ?, description = ? WHERE product_id = ?",
      [updatedName, updatedCategory, updatedPicture, updatedDescription, id]
    );
    return {
      message: `Product with ID: ${id} successfully updated.`,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    throw new Error(`Failed to update product with ID: ${id}. ${err.message}`);
  }
};

//D
const deleteProductById = async (id) => {
  try {
    const [rows] = await db.query("DELETE FROM products WHERE product_id = ?", [
      id,
    ]);
    return { message: `Product with ID: ${id} successfully deleted.` };
  } catch (err) {
    throw new Error(`Failed to delete product with ID: ${id}. ${err.message}`);
  }
};

export {
  createProduct,
  deleteProductById,
  readAllProducts,
  readProductById,
  readProductsByMonth,
  updateProductById,
};
