import { Request, Response } from "express"
import { UserProfileService } from "../services/UserProfileService"

export class GetUserMeController {
  constructor(private readonly userProfileService: UserProfileService) {}

  async run(req: Request, res: Response) {
    const userId = req.user?.id
    if (!userId)
      return res.status(401).json({ ok: false, message: "No autorizado" })

    try {
      const userWithStats = await this.userProfileService.getUserProfile(userId)
      return res.status(200).json({ ok: true, data: userWithStats })
    } catch (err) {
      return res.status(500).json({ ok: false, message: err })
    }
  }
}
