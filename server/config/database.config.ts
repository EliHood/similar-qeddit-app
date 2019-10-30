export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  timezone: string;
}

export const databaseConfig: DatabaseConfig = {
  username: "elihood",
  password: "",
  database: "elifullstack8",
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  timezone: "+00:00"
};
