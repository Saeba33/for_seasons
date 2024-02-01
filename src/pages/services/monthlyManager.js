const AbstractManager = require("./AbstractManager");

class monthlyManager extends AbstractManager {
  constructor() {
    super({ table: "products_of_months" });
  }

  //Create
  async createMonthly({ month, productId, featured }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (month, product_id, featured) VALUES (?, ?, ?)`,
      [month, productId, featured]
    );
    return rows.insertId;
  }

  //Read
  async readMonthly(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAllMonthly() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  //Update
  async updateAllFromOneMonthly({ month, productId, featured }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET month = ?, product_id = ?, featured = ? WHERE id = ?`,
      [month, productId, featured]
    );
    return rows[0];
  }

  //Delete
  async deleteOneMonthly(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return [rows];
  }
}

module.exports = monthlyManager;
