import { Request, Response } from "express"
import { TrailService } from "../services/trailService"

export class TrailsGetController {
  constructor(private readonly service: TrailService) {}

  async run(req: Request, res: Response) {
    const trails = await this.service.getTrails()

    if (!trails)
      return res.status(400).json({
        ok: false,
        message: "Trails not found",
      })
    return res.status(200).json({
      ok: true,
      data: trails,
    })
  }
}
