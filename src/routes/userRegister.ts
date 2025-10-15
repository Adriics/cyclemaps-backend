import { Router } from "express"
import { UserService } from "../services/userService"
import { UserHelper } from "../helpers/UserHelper"
import { UserRegisterController } from "../controllers/userRegisterController"

export function userRegister(router: Router): void {
  const service = new UserService(new UserHelper())

  const controller = new UserRegisterController(service)
  controller.run = controller.run.bind(controller)

  router.post("/auth/register", controller.run)
}
