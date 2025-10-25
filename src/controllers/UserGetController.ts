import { Request, Response } from "express"
import { UserService } from "../services/userService"

export class UserGetController {
  constructor(private readonly userService: UserService) {}

  async run(req: Request, res: Response) {
    const userId = req.params.id

    try {
      const user = await this.userService.getUserById(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}
