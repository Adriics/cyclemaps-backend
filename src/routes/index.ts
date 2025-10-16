import { Router } from "express"
import { userRegister } from "./userRegister"
import { userLogin } from "./userLogin"
import { getTrails } from "./getTrails"

export function registerRoutes(router: Router): Router {
  userRegister(router)
  userLogin(router)
  getTrails(router)

  return router
}
