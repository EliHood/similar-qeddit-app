"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/database.config");
const db = {};
const dotenv = require("dotenv");
const Redis = require("ioredis");
let redisClient;

if (process.env.NODE_ENV !== "development") {
  // inside if statement
  redisClient = new Redis({
    host: process.env.REDIS_URL,
    port: 18419,
  });
} else {
  redisClient = new Redis();
}
const RedisAdaptor = require("sequelize-transparent-cache-ioredis");
const redisAdaptor = new RedisAdaptor({
  client: redisClient,
  namespace: "model",
  lifetime: 0,
});
const sequelizeCache = require("sequelize-transparent-cache");
const { withCache } = sequelizeCache(redisAdaptor);
dotenv.config();
if (process.env.NODE_ENV === "production") {
  var sequelize = new Sequelize(process.env.DATABASE_URL, null);
} else {
  var sequelize = new Sequelize("elifullstack", "eli", "", {
    host: "127.0.0.1",
    dialect: "postgres",
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 1000000,
    },
  });
}
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = withCache(sequelize["import"](path.join(__dirname, file)));
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();
exports.default = db;
//# sourceMappingURL=index.js.map
