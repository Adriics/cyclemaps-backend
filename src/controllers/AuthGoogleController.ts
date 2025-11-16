import { Request, Response } from "express"
import { UserService } from "../services/userService"

export class AuthGoogleController {
  constructor(private readonly service: UserService) {}

  async run(req: Request, res: Response) {
    try {
      const { name, email, picture } = req.body

      console.log("🟢 Datos recibidos:", { name, email, picture }) // ← LOG

      if (!name || !email) {
        return res.status(400).json({
          ok: false,
          message: "Error, datos incompletos",
        })
      }

      const token = await this.service.createFromGoogle(name, email, picture)

      console.log("🟢 Token generado:", token) // ← LOG

      return res.status(201).json({
        ok: true,
        data: token,
      })
    } catch (error) {
      console.error("❌ Error en AuthGoogleController:", error) // ← LOG
      return res.status(500).json({
        ok: false,
        message: "Error al autenticar con Google",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }
}
