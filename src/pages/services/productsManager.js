const AbstractManager = require("./AbstractManager");

class productsManager extends AbstractManager {
  constructor() {
    super({ table: "products" });
  }

  //Create
  async createProduct({ name, category, picture, description }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (name, category, picture, description) VALUES (?, ?, ?, ?)`,
      [name, category, picture, description]
    );
    return rows.insertId;
  }

  //Read
  async readProduct(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAllProducts() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  //Update
  async updateAllFromOneProduct({ name, category, picture, description }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, category = ?, picture = ?, description = ? WHERE id = ?`,
      [name, category, picture, description]
    );
    return rows[0];
  }

  //Delete
  async deleteOneProduct(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return [rows];
  }
}

module.exports = productsManager;
