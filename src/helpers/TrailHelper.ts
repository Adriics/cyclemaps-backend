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
      .leftJoin("trail_like", "trail_like", "trail.id = trail_like.trailId")
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
      .addSelect("COUNT(trail_like.id)", "likeCount")
      .groupBy("trail.id")
      .addGroupBy("user.name")
      .getRawMany()

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
      authorName: trail.authorname,
      likeCount: parseInt(trail.likeCount, 0),
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

  async findById(id: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const rawTrail = await repository
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
        "trail.coordinates",
        "trail.createdAt",
        "trail.updatedAt",
        "user.name as authorName",
      ])
      .where("trail.id = :id", { id })
      .getRawOne()

    if (!rawTrail) return null

    return {
      id: rawTrail.trail_id,
      name: rawTrail.trail_name,
      description: rawTrail.trail_description,
      distance: rawTrail.trail_distance,
      elevationGain: rawTrail.trail_elevationGain,
      difficulty: rawTrail.trail_difficulty,
      authorId: rawTrail.trail_authorId,
      hash: rawTrail.trail_hash,
      imageUrl: rawTrail.trail_imageUrl,
      gpxFileUrl: rawTrail.trail_gpxFileUrl,
      coordinates: rawTrail.trail_coordinates,
      createdAt: rawTrail.trail_createdAt,
      updatedAt: rawTrail.trail_updatedAt,
      authorName: rawTrail.authorname,
    } as Trail
  }
}
