import dotenv from "dotenv";
import session from "express-session";
import Sequelize from "sequelize";
import redis from "redis";

dotenv.config();
const SequelizeStore = require("connect-session-sequelize")(session.Store);

let sequelize;

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
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },
  });
}

const myStore = new SequelizeStore({
  db: sequelize,
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

myStore.sync();
export default sessionConfig;
