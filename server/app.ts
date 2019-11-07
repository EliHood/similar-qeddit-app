import express from "express";
import http from "http";
import cors from "cors";
import logger from "morgan";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import apiRouter from "./routers";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import models from "./models/";
import { useSession, checkSession } from "./middlewares";
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app: express.Application = express();
const httpServer = http.createServer(app);

/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));

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
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(useSession());
app.use(checkSession());
app.use(
  cors({
    origin: "http://localhost:3001",
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"]
  })
);
app.use(express.static(path.join(__dirname, "../../client", "build")));
app.use("/api/v1", apiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "production") {
  app.use(logger("dev"));

  app.use("*", (req, res: Response) => {
    console.log(path.join(__dirname, "../../client", "build", "index.html"));
    res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
  });
}

models.sequelize.sync().then(() => {
  httpServer.listen(app.get("port"), () => {
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
});

export default app;
