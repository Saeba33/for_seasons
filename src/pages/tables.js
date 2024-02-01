const productsManager = require("./services/productsManager");
const recipesManager = require("./services/recipesManager");
const monthlyManager = require("./services/monthlyManager");
const favoritesManager = require("./services/favoritesManager");
const usersManager = require("./services/usersManager");
const loginManager = require("./services/loginManager");
const registerManager = require("./services/registerManager");


const managers = [
  productsManager,
  recipesManager,
  monthlyManager,
  favoritesManager,
  usersManager,
  loginManager,
  registerManager,
];

const tables = {};

managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();
  tables[manager.table] = manager;
});

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
