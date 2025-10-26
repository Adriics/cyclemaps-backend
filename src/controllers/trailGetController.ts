import { Request, Response } from "express"
import { TrailService } from "../services/trailService"

export class TrailGetController {
  constructor(private trailService: TrailService) {}

  async run(req: Request, res: Response) {
    const trailId = req.params.id

    try {
      const trailData = await this.trailService.getById(trailId)

      if (!trailData) {
        return res.status(404).json({ message: "Trail not found" })
      }

      res.status(200).json(trailData)
    } catch (error) {
      console.error("Error fetching trail by ID:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
