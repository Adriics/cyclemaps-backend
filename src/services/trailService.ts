import { TrailHelper } from "../helpers/TrailHelper"
import { Trail } from "../models/Trail"
import crypto from "crypto"
import { parseStringPromise } from "xml2js"

export class TrailService {
  constructor(private readonly helper: TrailHelper) {}

  async getTrails(): Promise<Trail[] | null> {
    return this.helper.findAll()
  }

  async create(
    file: Express.Multer.File,
    data: {
      name: string
      description: string
      distance: number
      elevationGain: number
      difficulty: "easy" | "medium" | "hard"
      authorId: string
    }
  ): Promise<Trail> {
    const gpxData = file.buffer.toString("utf8")
    const hashSum = crypto.createHash("sha256")
    hashSum.update(gpxData)
    const hash = hashSum.digest("hex")

    // 🔍 Comprobamos si ya existe un trail con ese hash
    const existing = await this.helper.findByHash(hash)
    if (existing) {
      throw new Error("This trail file already exists")
    }

    // 📦 Creamos la URL (puede ser en uploads local o S3)
    const imageUrl = `/uploads/${file.originalname}`

    // 🧱 Creamos la instancia del Trail
    const trail = new Trail(
      data.name,
      data.description,
      data.distance || 0,
      data.elevationGain || 0,
      data.difficulty,
      data.authorId,
      imageUrl
    )
    trail.hash = hash // nuevo campo en el modelo

    // 💾 Guardamos en la base de datos
    return await this.helper.create(trail)
  }
}
