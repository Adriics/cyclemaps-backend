import { Request, Response } from "express"
import { TrailService } from "../services/trailService"

export class TrailPostController {
  constructor(private readonly service: TrailService) {}

  async run(req: Request, res: Response) {
    try {
      console.log("✅ req.body:", req.body)
      console.log("✅ req.files:", req.files)

      const gpxFile = (req.files as any)?.["gpxFile"]?.[0]
      const imageFile = (req.files as any)?.["imageFile"]?.[0]

      console.log("✅ Archivos seleccionados:", { gpxFile, imageFile })

      if (!gpxFile) {
        return res
          .status(400)
          .json({ message: "No se ha subido ningún archivo .gpx" })
      }

      const authorId = req.user!.id
      const { name, description, distance, elevationGain, difficulty } =
        req.body

      const trail = await this.service.create(gpxFile, imageFile, {
        name,
        description,
        distance: Number(distance) || 0,
        elevationGain: Number(elevationGain) || 0,
        difficulty,
        authorId,
      })

      console.log("✅ Trail creado con éxito:", trail)

      return res.status(201).json({
        ok: true,
        message: "Trail created successfully",
        data: trail,
      })
    } catch (error: any) {
      console.error("❌ Error en TrailPostController:", error)
      res.status(400).json({
        ok: false,
        message: error.message || "Error creating trail",
      })
    }
  }
}
