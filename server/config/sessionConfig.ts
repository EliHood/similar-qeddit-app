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

const sessionConfig = {
  store: myStore,
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    path: "/",
    secure: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }
};

myStore.sync();
export default sessionConfig;
