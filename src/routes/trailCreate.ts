import { Router } from "express"
import multer from "multer"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailService } from "../services/trailService"
import { TrailPostController } from "../controllers/trailPostController"
import { AuthMiddleware } from "../middlewares/Auth"

export function trailCreate(router: Router) {
  const upload = multer()

  const service = new TrailService(new TrailHelper())
  const controller = new TrailPostController(service)
  controller.run = controller.run.bind(controller)

  router.post(
    "/trails",
    new AuthMiddleware().check,
    upload.fields([
      { name: "gpxFile", maxCount: 1 },
      { name: "imageFile", maxCount: 1 }, // 👈 aquí
    ]),
    controller.run
  )
}
