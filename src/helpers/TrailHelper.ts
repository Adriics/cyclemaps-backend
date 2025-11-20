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
      .leftJoin("users", "u", "trail.authorId = u.id")
      .leftJoin("trail_like", "tl", "trail.id = tl.trailId")
      .select([
        "trail.id AS id",
        "trail.name AS name",
        "trail.description AS description",
        "trail.distance AS distance",
        "trail.elevationGain AS elevationGain",
        "trail.difficulty AS difficulty",
        "trail.authorId AS authorId",
        "trail.hash AS hash",
        "trail.imageUrl AS imageUrl",
        "trail.gpxFileUrl AS gpxFileUrl",
        "trail.createdAt AS createdAt",
        "trail.updatedAt AS updatedAt",
        "u.name AS authorName",
      ])
      .addSelect("COUNT(tl.id)", "likeCount")
      .groupBy("trail.id")
      .addGroupBy("u.name")
      .getRawMany()
    
      console.log(rawTrails[0])

    return rawTrails.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      distance: t.distance,
      elevationGain: t.elevationGain,
      difficulty: t.difficulty,
      authorId: t.authorId,
      hash: t.hash,
      imageUrl: t.imageUrl,
      gpxFileUrl: t.gpxFileUrl,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      authorName: t.authorName,
      likeCount: parseInt(t.likeCount ?? "0"),
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
      .leftJoin("users", "u", "trail.authorId = u.id")
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
        "u.name as authorName",
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
      authorName: rawTrail.authorName,
    } as Trail
  }

  async findByAuthorId(authorId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const trail = await repository.findBy({ authorId: Equal(authorId) })

    return trail
  }
}
