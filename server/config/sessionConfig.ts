import session from "express-session";
import express from "express";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = new Sequelize(
  process.env.PSQL_NAME,
  process.env.PSQL_USER,
  process.env.PSQL_PASS,
  {
    dialect: "sqlite",
    storage: "./session.sqlite"
  }
);

const myStore = new SequelizeStore({
  db: sequelize
});

export interface sessionInterface {
  store: object;
  secret: string;
  resave: boolean;
  name: string;
  saveUninitialized: boolean;
  cookie: object;
}

const sessionConfig: sessionInterface = {
  store: myStore,
  secret: "nodetoken",
  resave: false,
  name: "session",
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    path: "/",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
};

myStore.sync();
export default sessionConfig;
