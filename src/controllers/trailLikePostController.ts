import { Request, Response } from "express"
import { TrailLikeService } from "../services/trailLikeService"

export class TrailLikePostController {
  constructor(protected service: TrailLikeService) {}

  async run(req: Request, res: Response) {
    const { trailId } = req.params
    const authorId = req.user!.id

    try {
      console.log(`User ${authorId} is liking trail ${trailId}`)

      const existingLike = await this.service.findTrailLike(authorId, trailId)

      if (existingLike) {
        await this.service.deleteTrailLike(authorId, trailId)
        return res.status(200).json({
          message: "Like removed succesfully",
          liked: false,
        })
      } else {
        const trailLike = await this.service.createTrailLike(authorId, trailId)

        if (!trailLike) {
          return res.status(400).json({ message: "Unable to like the trail." })
        }

        res.status(201).json(trailLike)
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error.", error })
    }
  }
}
