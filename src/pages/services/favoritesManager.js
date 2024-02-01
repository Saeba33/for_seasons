const AbstractManager = require("./AbstractManager");

class favoritesManager extends AbstractManager {
  constructor() {
    super({ table: "products" });
  }

  //Create
  async createFavorites({ userId, productId }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, product_id) VALUES (?, ?)`,
      [userId, productId]
    );
    return rows.insertId;
  }

  //Read
  async readFavorites(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAllFavorites() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  //Update
  async updateAllFromOneFavorites({ userId, productId }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ?, product_id = ? WHERE id = ?`,
      [userId, productId]
    );
    return rows[0];
  }

  //Delete
  async deleteOneFavorite(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return [rows];
  }
}

module.exports = favoritesManager;
