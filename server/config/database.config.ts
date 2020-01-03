export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  timezone: string;
}

export interface ProductionDbConfig {
  username: string;
  password: null;
  database: string;
  host: string;
  dialect: string;
  use_env_variable: string;
}

export const productionConfig: ProductionDbConfig = {
  username: "root",
  password: null,
  database:
    "postgres://uvkubxznpfwxum:26a14417c229c962db8393b426458ee072857dc4959ac39bcb138d0830156c61@ec2-54-243-44-102.compute-1.amazonaws.com:5432/ddd7nlo4spioug",
  host: "127.0.0.1",
  dialect: "postgres",
  use_env_variable: "DATABASE_URL"
};

export const databaseConfig: DatabaseConfig = {
  username: "eli",
  password: "",
  database: "elitypescript",
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  timezone: "+00:00"
};
