import { db } from "../../migrations/db";

//C
async function createAdminProduct({
  name,
  category,
  picture = null,
  description = null,
  month,
  featured = false,
}) {
  try {
    await db.beginTransaction();
    const [productResult] = await db.query(
      "INSERT INTO products (name, category, picture, description) VALUES (?, ?, ?, ?)",
      [name, category, picture || "", description || ""]
    );
    const productId = productResult.insertId;

    if (month) {
      await db.query(
        "INSERT INTO products_of_month (product_id, month, featured) VALUES (?, ?, ?)",
        [productId, month, featured]
      );
    }
    await db.commit();
    return {
      message: `Product successfully created with ID: ${productId}${
        month ? " and added to products_of_month" : ""
      }.`,
      id: productId,
    };
  } catch (error) {
    await db.rollback();
    throw new Error(`Error creating product: ${error.message}`);
  }
}

//R
async function readAdminProducts() {
  try {
    const [rows] = await db.query(
      `SELECT products.product_id, products.name, products.category, products.picture, products.description, products_of_month.month, products_of_month.featured
       FROM products
       LEFT JOIN products_of_month ON products.product_id = products_of_month.product_id`
    );
    return rows;
  } catch (err) {
    throw new Error(`Failed to retrieve products: ${err.message}`);
  }
}

async function readAdminProductById(product_id) {
  try {
    const [rows] = await db.query(
      `SELECT products.product_id, products.name, products.category, products.picture, products.description, products_of_month.month, products_of_month.featured
             FROM products
             LEFT JOIN products_of_month ON products.product_id = products_of_month.product_id
             WHERE products.product_id = ?`,
      [product_id]
    );
    if (rows.length === 0)
      throw new Error(`No product found with ID: ${product_id}`);
    return rows[0];
  } catch (err) {
    throw new Error(
      `Failed to retrieve product with ID: ${product_id}. ${err.message}`
    );
  }
}

//U
async function updateAdminProduct({
  product_id,
  name,
  category,
  picture,
  description,
  month,
  featured,
}) {
  try {
    await db.beginTransaction();
    const [current] = await db.query(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );
    if (current.length === 0)
      throw new Error(`Product with ID: ${product_id} not found.`);
    await db.query(
      "UPDATE products SET name = ?, category = ?, picture = ?, description = ? WHERE product_id = ?",
      [
        name || current[0].name,
        category || current[0].category,
        picture || current[0].picture,
        description || current[0].description,
        product_id,
      ]
    );
    if (month) {
      const [existing] = await db.query(
        "SELECT * FROM products_of_month WHERE product_id = ? AND month = ?",
        [product_id, month]
      );
      if (existing.length > 0) {
        await db.query(
          "UPDATE products_of_month SET featured = ? WHERE product_id = ? AND month = ?",
          [featured, product_id, month]
        );
      } else {
        await db.query(
          "INSERT INTO products_of_month (product_id, month, featured) VALUES (?, ?, ?)",
          [product_id, month, featured]
        );
      }
    }
    await db.commit();
    return { message: `Product with ID: ${product_id} successfully updated.` };
  } catch (error) {
    await db.rollback();
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

//D
async function deleteAdminProduct(product_id) {
  try {
    const [result] = await db.query(
      "DELETE FROM products WHERE product_id = ?",
      [product_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID: ${product_id} not found.`);
    }
    return { message: `Product with ID: ${product_id} successfully deleted.` };
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

export {
  createAdminProduct,
  deleteAdminProduct,
  readAdminProductById,
  readAdminProducts,
  updateAdminProduct,
};
