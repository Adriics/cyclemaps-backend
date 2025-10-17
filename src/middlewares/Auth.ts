import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export class AuthMiddleware {
  check(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith("Bearer ")) {
      res.status(401).send()
      return
    }

    const token = auth.replace("Bearer ", "")

    try {
      const data: any = jwt.verify(token, process.env.JWT_SECRET!)
      // <-- aquí ponemos req.user para que tu controlador lo use
      ;(req as any).user = { id: data.id } // cast corto para TS
      next()
    } catch (err) {
      res.status(401).send()
    }
  }
}
