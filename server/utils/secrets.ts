import * as dotenv from "dotenv";

// env is default to "development" unless env is specified
export let NODE_ENV;
process.env.NODE_ENV
  ? (NODE_ENV = process.env.NODE_ENV)
  : (NODE_ENV = "development");

// server url is default to "http://localhost" unless env is specified
export let SERVER_URL;
process.env.SERVER_URL
  ? (SERVER_URL = process.env.SERVER_URL)
  : (SERVER_URL = "http://localhost");

// port is default to 3030 unless env is specified
export let SERVER_PORT;
process.env.SERVER_PORT
  ? (SERVER_PORT = process.env.SERVER_PORT)
  : (SERVER_PORT = 3000);

export const { SESSION_NAME } = process.env;
export const { SESSION_SECRET } = process.env;

export const { REDIS_HOST } = process.env;
export const { REDIS_PORT } = process.env;
export const { REDIS_TIME_TO_LIVE } = process.env;

export const { PSQL_NAME } = process.env;
export const { PSQL_USER } = process.env;
export const { PSQL_PASS } = process.env;
export const { PSQL_HOST } = process.env;
