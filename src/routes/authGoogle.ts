import { Router } from "express"
import { AuthGoogleController } from "../controllers/AuthGoogleController"
import { UserService } from "../services/userService"
import { UserHelper } from "../helpers/UserHelper"

export function authGoogleRoute(router: Router) {
  const service = new UserService(new UserHelper())

  const controller = new AuthGoogleController(service)
  controller.run = controller.run.bind(controller)

  router.post("/auth/google", controller.run)
}
