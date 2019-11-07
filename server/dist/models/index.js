"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require("../config/database.config");
var db = {};
var dotenv = require("dotenv");
dotenv.config();
if (process.env.NODE_ENV === "production") {
    var sequelize = new Sequelize(process.env.DATABASE_URL, null);
}
else {
    var sequelize = new Sequelize("elifullstack8", "elihood", "", {
        host: "127.0.0.1",
        dialect: "postgres"
    });
}
fs.readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
})
    .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map