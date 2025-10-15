import { json } from "body-parser"
import { registerRoutes } from "./routes"
import express, { Express, Router } from "express"
import dataSource from "./dataSourceConfig"
import cors from "cors"

export function server() {
  const app: Express = express()
  app.use(json())
  app.use(cors())

  dataSource
    .initialize()
    .then(() => console.log("DataSource initialized"))
    .catch((err: any) => console.error("Error initializing DataSource:", err))

  const router: Router = Router()

  const endpoints = registerRoutes(router)

  app.use("/v1/cyclemaps", endpoints)

  app.listen(5004, () => {
    console.log("Server is running on port 5004")
  })
}
server()
