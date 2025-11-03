import { Request, Response } from "express"
import { UserProfileService } from "../services/UserProfileService"

export class UserProfileController {
  constructor(private readonly service: UserProfileService) {}

  async run(req: Request, res: Response) {
    const userId = (req as any).user.id

    try {
      const profile = await this.service.getUserProfile(userId)

      if (!profile) {
        return res.status(404).json({ message: "User not found" })
      }

      res.status(200).json(profile)
    } catch (error) {
      res.status(500).json({ message: "Internal server error:", error })
    }
  }
}
