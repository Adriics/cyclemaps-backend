import { Equal } from "typeorm"
import dataSource from "../dataSourceServer"
import { Trail } from "../models/Trail"
import { trailSchema } from "../schemas/trail.schema"

export class TrailHelper {
  protected schema = trailSchema
  protected connection = dataSource

  async findAll(): Promise<any[]> {
    const repository = (await this.connection).getRepository(this.schema)

    const rawTrails = await repository
      .createQueryBuilder("trail")
      .leftJoin("user", "user", "trail.authorId = user.id")
      .select([
        "trail.id",
        "trail.name",
        "trail.description",
        "trail.distance",
        "trail.elevationGain",
        "trail.difficulty",
        "trail.authorId",
        "trail.hash",
        "trail.imageUrl",
        "trail.gpxFileUrl",
        "trail.createdAt",
        "trail.updatedAt",
        "user.name as authorName",
      ])
      .getRawMany()

    // Mapear los campos con prefijos trail_ a camelCase
    return rawTrails.map((trail) => ({
      id: trail.trail_id,
      name: trail.trail_name,
      description: trail.trail_description,
      distance: trail.trail_distance,
      elevationGain: trail.trail_elevationGain,
      difficulty: trail.trail_difficulty,
      authorId: trail.trail_authorId,
      hash: trail.trail_hash,
      imageUrl: trail.trail_imageUrl,
      gpxFileUrl: trail.trail_gpxFileUrl,
      createdAt: trail.trail_createdAt,
      updatedAt: trail.trail_updatedAt,
      authorName: trail.authorname, // ← authorname en minúsculas
    }))
  }

  async create(trail: Trail) {
    const repository = (await this.connection).getRepository(this.schema)

    return repository.save(trail)
  }

  async findByHash(hash: string) {
    return (await dataSource).getRepository("Trail").findOneBy({
      hash: Equal(hash),
    }) as Promise<Trail | null>
  }
}
