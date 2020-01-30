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
    "postgres://ioteamxpujujwc:5a15ba464293dac39884bbb11378bba5eb9051dbb0cea1cb2cd4aed9e290aa7b@ec2-174-129-255-39.compute-1.amazonaws.com:5432/d1o70k57t0j4vo",
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
