import "dotenv/config"
import { DataSource } from "typeorm"

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: true,
  entities: [__dirname + "/**/*.schema.{ts,js}"],
  migrations: ["src/persistence/**/*.ts"],
})

export default dataSource
