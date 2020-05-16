import dotenv from "dotenv";
import session from "express-session";
import Sequelize from "sequelize";
import redis from "redis";

dotenv.config();
const SequelizeStore = require("connect-session-sequelize")(session.Store);

let sequelize;
let redisClient;
if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    process.env.PSQL_NAME,
    process.env.PSQL_USER,
    process.env.PSQL_PASS,
    {
      dialect: "sqlite",
      storage: "./session.sqlite",
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "sqlite",
    storage: "./session.sqlite",
  });
}

if (process.env.NODE_ENV !== "development") {
  // inside if statement
  var rtg = require("url").parse(process.env.REDIS_URL);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);

  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = redis.createClient();
}
let RedisStore = require("connect-redis")(session);

const myStore = new RedisStore({
  client: redisClient,
});

export interface sessionInterface {
  store: object;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: object;
}

const sessionConfig: sessionInterface = {
  store: myStore,
  secret: "nodetoken",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    path: "/",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
};

// myStore.sync();
export default sessionConfig;
