import { Router } from "express"
import { UserService } from "../services/userService"
import { UserHelper } from "../helpers/UserHelper"
import { UserLoginController } from "../controllers/userLoginController"

export function userLogin(router: Router): void {
  const service = new UserService(new UserHelper())

  const controller = new UserLoginController(service)
  controller.run = controller.run.bind(controller)

  router.post("/auth/login", controller.run)
}
