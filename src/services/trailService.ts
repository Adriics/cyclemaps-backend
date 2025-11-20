import { UploadApiResponse } from "cloudinary"
import { TrailHelper } from "../helpers/TrailHelper"
import { Trail } from "../models/Trail"
import crypto from "crypto"
import cloudinary from "../config/cloudinary"
import { calculateDistanceFromGpx } from "../utils/gpxUtils"

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

    // 📏 Calcular distancia desde el GPX
    const gpxData = gpxFile.buffer.toString("utf8")

    const distanceResult = calculateDistanceFromGpx(gpxData)
    if (distanceResult === 0) {
      throw new Error("Invalid GPX data")
    }
    const { distance, elevationGain, coordinates } = distanceResult

    // 🖼️ Subir imagen si existe
    let imageUrl: string | undefined = undefined
    if (imageFile) {
      console.log("🌟 Subiendo imagen a Cloudinary...")
      const imageUploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "trail_images" }, (error, result) => {
              if (error) {
                console.error("❌ Error subiendo imagen a Cloudinary:", error)
                return reject(error)
              }
              resolve(result!)
            })
            .end(imageFile.buffer)
        }
      )
    
      imageUrl = imageUploadResult.secure_url
      console.log("🌟 Imagen subida correctamente:", imageUrl)
    } else {
      console.log("⚠️ No se recibió imagen, imageFile es undefined")
    }

    console.log("imageFile:", imageFile)
    console.log("imageUrl:", imageUrl)

    // 🔐 Generar hash único del GPX
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
      distance,
      elevationGain,
      data.difficulty,
      data.authorId,
      undefined,
      hash,
      imageUrl,
      gpxFileUrl,
      coordinates
    )

    return await this.helper.create(trail)
  }

  async getById(id: string): Promise<Trail | null> {
    return this.helper.findById(id)
  }
}
