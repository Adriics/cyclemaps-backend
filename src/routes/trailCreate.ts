import { Router } from "express"
import { TrailService } from "../services/trailService"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailPostController } from "../controllers/trailPostController"
import multer from "multer"
import { AuthMiddleware } from "../middlewares/Auth"

export function trailCreate(router: Router) {
  const service = new TrailService(new TrailHelper())

  const controller = new TrailPostController(service)
  controller.run = controller.run.bind(controller)

  const upload = multer()

  router.post(
    "/trails",
    new AuthMiddleware().check,
    upload.single("gpxFile"), // <- esto es imprescindible para que req.file exista
    controller.run
  )
}
