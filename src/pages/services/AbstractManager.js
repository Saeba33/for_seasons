const database = require("../services/dbConnection");

class AbstractManager {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }
}

module.exports = AbstractManager;
