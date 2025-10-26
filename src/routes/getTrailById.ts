import { Router } from "express"
import { TrailService } from "../services/trailService"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailGetController } from "../controllers/trailGetController"

export function getTrailById(router: Router) {
  const service = new TrailService(new TrailHelper())

  const controller = new TrailGetController(service)

  controller.run = controller.run.bind(controller)

  router.get("/trails/:id", controller.run)
}
