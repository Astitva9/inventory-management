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

db.subCategory = require("./subCategory.model.js")(sequelize, Sequelize);

db.brands = require("./brand.model.js")(sequelize, Sequelize);

db.product = require("./product.model.js")(sequelize, Sequelize);

// category Relationship setup
db.category.hasMany(db.subCategory, {
  foreignKey: "category_id",
  foreignKeyConstraint: true,
});

// Sub category Relationship setup

db.category.hasMany(db.brands, {
  foreignKey: "category_id",
  foreignKeyConstraint: true,
});

db.subCategory.hasMany(db.brands, {
  foreignKey: "sub_category_id",
  foreignKeyConstraint: true,
});

// Product Relationship Setup

db.category.hasMany(db.product, {
  foreignKey: "category_id",
  foreignKeyConstraint: true,
});

db.subCategory.hasMany(db.product, {
  foreignKey: "sub_category_id",
  foreignKeyConstraint: true,
});

db.brands.hasMany(db.product, {
  foreignKey: "brand_id",
  foreignKeyConstraint: true,
});

module.exports = db;
