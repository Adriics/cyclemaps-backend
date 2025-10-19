import { UploadApiResponse } from "cloudinary"
import { TrailHelper } from "../helpers/TrailHelper"
import { Trail } from "../models/Trail"
import crypto from "crypto"
import cloudinary from "../config/cloudinary"

export class TrailService {
  constructor(private readonly helper: TrailHelper) {}

  async getTrails(): Promise<Trail[] | null> {
    return this.helper.findAll()
  }

  async create(
    gpxFile: Express.Multer.File,
    imageFile: Express.Multer.File | undefined,
    data: {
      name: string
      description: string
      distance: number
      elevationGain: number
      difficulty: "easy" | "medium" | "hard"
      authorId: string
    }
  ): Promise<Trail> {
    // 🗺️ Subir archivo GPX a Cloudinary (en carpeta trails_gpx)
    const gpxUploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "raw", folder: "trails_gpx" },
            (error, result) => {
              if (error) return reject(error)
              resolve(result!)
            }
          )
          .end(gpxFile.buffer)
      }
    )

    const gpxFileUrl = gpxUploadResult.secure_url

    // 🖼️ Subir imagen si existe
    let imageUrl: string | undefined = undefined
    if (imageFile) {
      const imageUploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "trail_images" }, (error, result) => {
              if (error) return reject(error)
              resolve(result!)
            })
            .end(imageFile.buffer)
        }
      )

      imageUrl = imageUploadResult.secure_url
    }

    // 🔐 Generar hash único del GPX
    const gpxData = gpxFile.buffer.toString("utf8")
    const hashSum = crypto.createHash("sha256")
    hashSum.update(gpxData)
    const hash = hashSum.digest("hex")

    // 🔍 Evitar duplicados
    const existing = await this.helper.findByHash(hash)
    if (existing) {
      throw new Error("This trail file already exists")
    }

    // 🧱 Crear entidad
    const trail = new Trail(
      data.name,
      data.description,
      data.distance || 0,
      data.elevationGain || 0,
      data.difficulty,
      data.authorId,
      hash,
      imageUrl,
      gpxFileUrl
    )

    return await this.helper.create(trail)
  }
}
