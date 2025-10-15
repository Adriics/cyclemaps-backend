import { createHmac } from "crypto"
import { UserHelper } from "../helpers/UserHelper"
import { User } from "../models/User"
import jwt from "jsonwebtoken"
import { UserNotFound } from "../errors/UserNotFound"

export class UserService {
  constructor(private readonly userHelper: UserHelper) {}

  async hashPassword(password: string): Promise<string> {
    const hashGeneratos = createHmac("sha512", "salt")
    const hash = hashGeneratos.update(password).digest("hex")
    return hash
  }

  async create(name: string, email: string, password: string) {
    // Buscar por email en lugar de id
    const exists = await this.userHelper.findByEmail(email)

    if (exists) throw new Error("User already exists")

    const hash = await this.hashPassword(password)

    const user = new User(name, email, hash)

    const newUser = await this.userHelper.create(user)

    return newUser
  }

  async login(email: string, password: string): Promise<string> {
    const hashGeneratos = createHmac("sha512", "salt")
    const hash = hashGeneratos.update(password).digest("hex")

    const user = await this.userHelper.findByEmailAndPassword(email, hash)

    if (!user) {
      throw new UserNotFound(`An user with email ${email} was not found`)
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!
    )

    return token
  }
}
