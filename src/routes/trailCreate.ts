import { Router } from "express"
import { TrailService } from "../services/trailService"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailPostController } from "../controllers/trailPostController"

export function trailCreate(router: Router) {
  const service = new TrailService(new TrailHelper())

  const controller = new TrailPostController()
  controller.run = controller.run.bind(controller)

  router.post("/trails/add", controller.run)
}
