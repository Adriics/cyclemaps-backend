import { Router } from "express"
import { userRegister } from "./userRegister"
import { userLogin } from "./userLogin"

export function registerRoutes(router: Router): Router {
  userRegister(router)
  userLogin(router)

  return router
}
