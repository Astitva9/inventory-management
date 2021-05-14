const dbConfig = require("../config/dbConnection");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

db.category = require("./category.model.js")(sequelize, Sequelize);

module.exports = db;
