import { Request, Response } from "express"
import { TrailService } from "../services/trailService"

export class TrailPostController {
  constructor(private readonly service: TrailService) {}

  async run(req: Request, res: Response) {
    try {
      const gpxFile = (req.files as any)?.["gpxFile"]?.[0]
      const imageFile = (req.files as any)?.["imageFile"]?.[0]

      if (!gpxFile) {
        return res
          .status(400)
          .json({ message: "No se ha subido ningún archivo .gpx" })
      }

      const authorId = req.user!.id
      const { name, description, distance, elevationGain, difficulty } =
        req.body

      console.log("Archivos recibidos:", { gpxFile, imageFile })

      const trail = await this.service.create(gpxFile, imageFile, {
        name,
        description,
        distance: Number(distance) || 0,
        elevationGain: Number(elevationGain) || 0,
        difficulty,
        authorId,
      })

      return res.status(201).json({
        ok: true,
        message: "Trail created successfully",
        data: trail,
      })
    } catch (error: any) {
      console.error(error)
      res.status(400).json({
        ok: false,
        message: error.message || "Error creating trail",
      })
    }
  }
}
