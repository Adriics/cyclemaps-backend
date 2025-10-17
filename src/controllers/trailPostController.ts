import { Request, Response } from "express"
import { TrailService } from "../services/trailService"

export class TrailPostController {
  constructor(private readonly service: TrailService) {}
  async run(req: Request, res: Response) {
    try {
      const file = req.file

      if (!file)
        return res
          .status(400)
          .json({ message: "No se ha subido ningun archivo .gpx" })

      const authorId = req.user!.id
      const { name, description, distance, elevationGain, difficulty } =
        req.body

      console.log(req.file)

      const trail = await this.service.create(file, {
        name,
        description,
        distance: Number(distance),
        elevationGain: Number(elevationGain),
        difficulty,
        authorId,
      })

      return res.status(201).json({
        ok: true,
        message: "Trail created succesfully",
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
