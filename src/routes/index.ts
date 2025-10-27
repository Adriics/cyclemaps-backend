import { Router } from "express"
import { userRegister } from "./userRegister"
import { userLogin } from "./userLogin"
import { getTrails } from "./getTrails"
import { trailCreate } from "./trailCreate"
import { getUserById } from "./getUserById"
import { getTrailById } from "./getTrailById"
import { trailLikePost } from "./trailLikePost"

export function registerRoutes(router: Router): Router {
  userRegister(router)
  userLogin(router)
  trailCreate(router)
  getTrails(router)
  getUserById(router)
  getTrailById(router)
  trailLikePost(router)

  return router
}
