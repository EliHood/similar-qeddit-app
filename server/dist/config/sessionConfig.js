"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const sequelize_1 = __importDefault(require("sequelize"));
dotenv_1.default.config();
const SequelizeStore = require("connect-session-sequelize")(express_session_1.default.Store);
let sequelize;
if (process.env.NODE_ENV === "development") {
    sequelize = new sequelize_1.default(process.env.PSQL_NAME, process.env.PSQL_USER, process.env.PSQL_PASS, {
        dialect: "sqlite",
        storage: "./session.sqlite",
    });
}
else {
    sequelize = new sequelize_1.default(process.env.DATABASE_URL, {
        dialect: "sqlite",
        storage: "./session.sqlite",
    });
}
const myStore = new SequelizeStore({
    db: sequelize,
});
const sessionConfig = {
    store: myStore,
    secret: "nodetoken",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        path: "/",
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
};
// myStore.sync();
exports.default = sessionConfig;
//# sourceMappingURL=sessionConfig.js.map