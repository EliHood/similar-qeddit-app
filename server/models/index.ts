"use strict";

const fs = require("fs");

const path = require("path");

const Sequelize = require("sequelize");

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";

const config = require("../config/database.config");

const db = {};

const dotenv = require("dotenv");

dotenv.config();

if (process.env.NODE_ENV === "production") {
  const sequelize = new Sequelize(process.env.DATABASE_URL, null);
} else {
  const sequelize = new Sequelize("elifullstack", "eli", "", {
    host: "127.0.0.1",

    dialect: "postgres",
  });
}

fs.readdirSync(__dirname)

  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })

  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.Sequelize = Sequelize;

export default db;
