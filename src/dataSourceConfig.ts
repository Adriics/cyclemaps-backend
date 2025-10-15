import "dotenv/config"
import { DataSource, DataSourceOptions } from "typeorm"

const dataSource = new DataSource({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [__dirname + "/**/*.schema.{ts,js}"],
  migrations: ["src/persistence/**/*.ts"],

  type: "postgres",
} as DataSourceOptions)

export default dataSource
