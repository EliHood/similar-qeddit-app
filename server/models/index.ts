"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
interface Db {
  sequelize: object;
  Sequelize: object;
}

const db = {} as Db;
const dotenv = require("dotenv");
dotenv.config();
if (process.env.NODE_ENV === "production") {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
} else {
  console.log(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.PSQL_HOST
  );
  var sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    "",
    {
      host: process.env.PSQL_HOST,
      dialect: "postgres",
      pool: {
        max: 100,
        min: 0,
        idle: 200000,
        // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
        acquire: 1000000,
      },
    }
  );
}
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
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
