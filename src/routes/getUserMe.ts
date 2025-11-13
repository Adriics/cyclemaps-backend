// routes/getUserMe.ts
import { Router } from "express"
import { AuthMiddleware } from "../middlewares/Auth"
import { GetUserMeController } from "../controllers/GetUserMeController"
import { TrailLikeHelper } from "../helpers/TrailLikeHelper"
import { TrailHelper } from "../helpers/TrailHelper"
import { UserProfileService } from "../services/UserProfileService"
import { UserHelper } from "../helpers/UserHelper"

export function getUserMe(router: Router) {
  const controller = new GetUserMeController(
    new UserProfileService(
      new UserHelper(),
      new TrailHelper(),
      new TrailLikeHelper()
    )
  )
  controller.run = controller.run.bind(controller)

  router.get("/v1/users/me", new AuthMiddleware().check, controller.run)
}
