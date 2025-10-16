import { Router } from "express"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailService } from "../services/trailService"
import { TrailsGetController } from "../controllers/trailsGetController"

export function getTrails(router: Router) {
  const service = new TrailService(new TrailHelper())

  const controller = new TrailsGetController(service)

  controller.run = controller.run.bind(controller)

  router.get("/trails", controller.run)
}
