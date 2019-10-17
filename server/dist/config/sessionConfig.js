"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// if (!process.env.PORT) {
//   require("dotenv").config();
// }
// export interface seqStoreInterface {
//   dbName?: string;
//   dbUser?: string;
//   dbPass?: string;
//   dialect: string;
//   storage: string;
// }
// export const seqStore: seqStoreInterface = {
//   dbName: process.env.PSQL_NAME,
//   dbUser: process.env.PSQL_USER,
//   dbPass: process.env.PSQL_PASS,
//   dialect: "sqlite",
//   storage: "./session.sqlite"
// };
// const myStore = new SequelizeStore({
//   db: seqStore
// });
const sessionConfig = {
    store: null,
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        path: "/",
        secure: false,
        maxAge: 604800000 // 1000 * 60 * 60 * 24 * 7 in milliseconds
    }
};
exports.default = sessionConfig;
//# sourceMappingURL=sessionConfig.js.map