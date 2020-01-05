"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport");
const models_1 = __importDefault(require("./models/"));
const middlewares_1 = require("./middlewares");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
    // to simulate latency of 50ms - 1000ms
    // app.use(simulateLatency(50, 1000));
}
app.set("port", PORT);
// app.use(
//   session({
//     saveUninitialized: false,
//     resave: false,
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//     secret: "nodeauth"
//   })
// );
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "5mb", extended: true }));
app.use(middlewares_1.useSession());
app.use(middlewares_1.checkSession());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(cors_1.default({
    origin: process.env.ALLOW_ORIGIN,
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"]
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client", "build")));
app.use("/api/v1", routers_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "production") {
    app.use(morgan_1.default("dev"));
    app.use("*", (req, res) => {
        console.log(path_1.default.join(__dirname, "../../client", "build", "index.html"));
        res.sendFile(path_1.default.join(__dirname, "../../client", "build", "index.html"));
    });
}
models_1.default.sequelize.sync().then(() => {
    httpServer.listen(PORT, () => {
        console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map