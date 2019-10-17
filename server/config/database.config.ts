export interface DatabaseConfig {
  username: string;
  password: null;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean | Function;
  force: boolean;
  timezone: string;
}

export const databaseConfig: DatabaseConfig = {
  username: "elihood",
  password: null,
  database: "elifullstack6",
  host: "127.0.0.1",
  port: 3000,
  dialect: "postgres",
  logging: true,
  force: true,
  timezone: "+00:00"
};
