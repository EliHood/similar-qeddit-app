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
    "postgres://rsbeejitzzdmec:63c01b4a48e43b9324471818f17b140722504a782cb93b6ab4356be0466b4ad2@ec2-107-21-235-87.compute-1.amazonaws.com:5432/d7lbo94egec9uh",
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
