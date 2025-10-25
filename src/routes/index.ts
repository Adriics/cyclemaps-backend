import { Router } from "express"
import { userRegister } from "./userRegister"
import { userLogin } from "./userLogin"
import { getTrails } from "./getTrails"
import { trailCreate } from "./trailCreate"
import { get } from "http"
import { getUserById } from "./getUserById"

export function registerRoutes(router: Router): Router {
  userRegister(router)
  userLogin(router)
  trailCreate(router)
  getTrails(router)
  getUserById(router)

  return router
}
