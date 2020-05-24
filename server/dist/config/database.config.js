"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = exports.productionConfig = void 0;
exports.productionConfig = {
    username: "root",
    password: null,
    database: "postgres://zzjzaopwltbuaj:ab21764595dc0a6d1605904addd5adef5b39c82ccde64662b8a2fe67cf173e8d@ec2-35-169-254-43.compute-1.amazonaws.com:5432/dclu6tass2c05g",
    host: "127.0.0.1",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
};
exports.databaseConfig = {
    username: "eli",
    password: "",
    database: "elifullstack",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    timezone: "+00:00",
};
//# sourceMappingURL=database.config.js.map