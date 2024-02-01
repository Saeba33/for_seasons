const AbstractManager = require("./AbstractManager");

class recipesManager extends AbstractManager {
  constructor() {
    super({ table: "recipes" });
  }

  //Create
  async createRecipe({
    title,
    photo,
    difficulty,
    duration,
    numberPersons,
    instructions,
    ustensils,
    information,
    userId,
  }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (title, photo, difficulty, duration, number_persons, instructions, ustensils, information, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        photo,
        difficulty,
        duration,
        numberPersons,
        instructions,
        ustensils,
        information,
        userId,
      ]
    );
    return rows.insertId;
  }

  //Read
  async readRecipe(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAllRecipes() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  //Update
  async updateAllFromOneRecipe({
    title,
    photo,
    difficulty,
    duration,
    numberPersons,
    instructions,
    ustensils,
    information,
  }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, photo = ?, difficulty = ?, duration = ?, number_persons = ?, instructions = ?, ustensils = ?, information = ?  WHERE id = ?`,
      [
        title,
        photo,
        difficulty,
        duration,
        numberPersons,
        instructions,
        ustensils,
        information,
      ]
    );
    return rows[0];
  }

  //Delete
    async deleteOneRecipe(id) {
        const [rows] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
        );
        return [rows];
    }
}

module.exports = recipesManager;
