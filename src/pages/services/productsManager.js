import db from "../dbConnection";

async function getProducts() {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
}

export default getProducts;
