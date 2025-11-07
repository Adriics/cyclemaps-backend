import { Request, Response } from "express"
import { UserService } from "../services/userService"
import { UserNotFound } from "../errors/UserNotFound"

export class UserLoginController {
  constructor(private readonly service: UserService) {}

  async run(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    try {
      const token = await this.service.login(email, password)

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // SOLO HTTPS EN PROD
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })

      res.status(200).json({
        ok: true,
        message: "User logged in succesfully",
      })
    } catch (error) {
      console.log(error)
      if (error instanceof UserNotFound) {
        res.status(400).send()
        return
      }

      res.status(500).send()
    }
  }
}
