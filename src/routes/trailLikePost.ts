import { Router } from "express"
import { TrailLikeService } from "../services/trailLikeService"
import { TrailLikeHelper } from "../helpers/TrailLikeHelper"
import { TrailLikePostController } from "../controllers/trailLikePostController"
import { AuthMiddleware } from "../middlewares/Auth"

export function trailLikePost(router: Router) {
  const service = new TrailLikeService(new TrailLikeHelper())

  const controller = new TrailLikePostController(service)

  controller.run = controller.run.bind(controller)

  router.post(
    "/trails/:trailId/like",
    new AuthMiddleware().check,
    controller.run
  )
}
