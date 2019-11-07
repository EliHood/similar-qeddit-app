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
    "postgres://qlljntyxrcudhd:eec0253395ee1249a2d0f231f83050c62951817a37684f7be7202738d67ac017@ec2-174-129-253-169.compute-1.amazonaws.com:5432/ddk9u0stgls9ms",
  host: "127.0.0.1",
  dialect: "postgres",
  use_env_variable: "DATABASE_URL"
};

export const databaseConfig: DatabaseConfig = {
  username: "elihood",
  password: "",
  database: "elifullstack8",
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  timezone: "+00:00"
};
