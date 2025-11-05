import { Request, Response } from "express"
import { UserService } from "../services/userService"

export class AuthGoogleController {
  constructor(private readonly service: UserService) {}

  async run(req: Request, res: Response) {
    const { name, email, picture } = req.body

    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        message: "Error, datos incompletos",
      })
    }

    const token = await this.service.createFromGoogle(name, email, picture)

    return res.status(201).json({
      ok: true,
      data: token,
    })
  }
}
