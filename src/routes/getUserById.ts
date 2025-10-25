import { Router } from "express"
import { UserService } from "../services/userService"
import { UserHelper } from "../helpers/UserHelper"
import { UserGetController } from "../controllers/UserGetController"

export function getUserById(router: Router) {
  const service = new UserService(new UserHelper())

  const controller = new UserGetController(service)
  controller.run = controller.run.bind(controller)

  router.get("/users/:id", controller.run)
}
