"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV
    ? (exports.NODE_ENV = process.env.NODE_ENV)
    : (exports.NODE_ENV = "development");
process.env.SERVER_URL
    ? (exports.SERVER_URL = process.env.SERVER_URL)
    : (exports.SERVER_URL = "http://localhost");
process.env.SERVER_PORT
    ? (exports.SERVER_PORT = process.env.SERVER_PORT)
    : (exports.SERVER_PORT = 3000);
exports.SESSION_NAME = process.env.SESSION_NAME;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.REDIS_HOST = process.env.REDIS_HOST;
exports.REDIS_PORT = process.env.REDIS_PORT;
exports.REDIS_TIME_TO_LIVE = process.env.REDIS_TIME_TO_LIVE;
exports.PSQL_NAME = process.env.PSQL_NAME;
exports.PSQL_USER = process.env.PSQL_USER;
exports.PSQL_PASS = process.env.PSQL_PASS;
exports.PSQL_HOST = process.env.PSQL_HOST;
//# sourceMappingURL=secrets.js.map