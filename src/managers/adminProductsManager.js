import { connectToDb, db } from "@/database/connection";

//C
async function createAdminProduct({
  name,
  category,
  picture = null,
  description = null,
  month,
  featured = false,
}) {
  const connection = await connectToDb();
  try {
    await connection.beginTransaction();
    const [productResult] = await connection.query(
      "INSERT INTO products (name, category, picture, description) VALUES (?, ?, ?, ?)",
      [name, category, picture || "", description || ""]
    );
    const productId = productResult.insertId;

    if (month) {
      await connection.query(
        "INSERT INTO products_of_month (product_id, month, featured) VALUES (?, ?, ?)",
        [productId, month, featured]
      );
    }
    await connection.commit();
    return {
      message: `Product successfully created with ID: ${productId}${
        month ? " and added to products_of_month" : ""
      }.`,
      id: productId,
    };
  } catch (error) {
    await connection.rollback();
    console.error("Error creating product:", error);
    throw new Error(`Error creating product: ${error.message}`);
  } finally {
    connection.release();
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
  const connection = await connectToDb();
  try {
    await connection.beginTransaction();
    const [current] = await connection.query(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );
    if (current.length === 0) {
      throw new Error(`Product with ID: ${product_id} not found.`);
    }
    if (month !== undefined && month !== current[0].month) {
      await connection.query(
        "UPDATE products_of_month SET month = ? WHERE product_id = ?",
        [month, product_id]
      );
    }
    if (featured !== undefined && featured !== current[0].featured) {
      await connection.query(
        "UPDATE products_of_month SET featured = ? WHERE product_id = ?",
        [featured, product_id]
      );
    }
    await connection.query(
      "UPDATE products SET name = ?, category = ?, picture = ?, description = ? WHERE product_id = ?",
      [
        name || current[0].name,
        category || current[0].category,
        picture || current[0].picture,
        description || current[0].description,
        product_id,
      ]
    );
    await connection.commit();
    return { message: `Product with ID: ${product_id} successfully updated.` };
  } catch (error) {
    await connection.rollback();
    console.error(`Failed to update product with ID: ${product_id}`, error);
    throw new Error(`Failed to update product: ${error.message}`);
  } finally {
    connection.release();
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
