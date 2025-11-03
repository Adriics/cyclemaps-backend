import { Router } from "express"
import { UserHelper } from "../helpers/UserHelper"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailLikeHelper } from "../helpers/TrailLikeHelper"
import { UserProfileController } from "../controllers/UserProfileController"
import { UserProfileService } from "../services/UserProfileService"
import { authenticate } from "../middlewares/Auth"

export function getProfile(router: Router) {
  const service = new UserProfileService(
    new UserHelper(),
    new TrailHelper(),
    new TrailLikeHelper()
  )

  const controller = new UserProfileController(service)

  controller.run = controller.run.bind(controller)

  router.get("/user/profile", authenticate, controller.run)
}
