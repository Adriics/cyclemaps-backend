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
  
    return rawTrails.map((t) => {
      const get = (camel: string, lower?: string, prefixed?: string) =>
        t[camel] ?? t[lower ?? camel.toLowerCase()] ?? t[prefixed ?? camel.toLowerCase()]
  
      return {
        id: get("id"),
        name: get("name"),
        description: get("description"),
        distance: get("distance"),
        // elevationGain puede venir como elevationgain o trail_elevationGain según query
        elevationGain: get("elevationGain", "elevationgain", "trail_elevationgain") ?? undefined,
        difficulty: get("difficulty"),
        authorId: get("authorId", "authorid", "trail_authorid") ?? undefined,
        hash: get("hash"),
        // imageUrl puede venir como imageurl
        imageUrl: get("imageUrl", "imageurl", "trail_imageurl") ?? undefined,
        gpxFileUrl: get("gpxFileUrl", "gpxfileurl", "trail_gpxfileurl") ?? undefined,
        createdAt: get("createdAt", "createdat", "trail_createdat") ?? undefined,
        updatedAt: get("updatedAt", "updatedat", "trail_updatedat") ?? undefined,
        authorName: get("authorName", "authorname", "u_name") ?? undefined,
        likeCount: parseInt(get("likeCount", "likecount", "count") ?? "0", 10),
      }
    })
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
  
    const get = (camel: string, lower?: string, prefixed?: string) =>
      rawTrail[camel] ?? rawTrail[lower ?? camel.toLowerCase()] ?? rawTrail[prefixed ?? camel.toLowerCase()]
  
    return {
      id: get("trail_id", "id", "trail_id") ?? get("id"),
      name: get("trail_name", "name", "trail_name") ?? get("name"),
      description: get("trail_description", "description") ?? get("description"),
      distance: get("trail_distance", "distance") ?? get("distance"),
      elevationGain: get("trail_elevationGain", "elevationgain") ?? undefined,
      difficulty: get("trail_difficulty", "difficulty") ?? get("difficulty"),
      authorId: get("trail_authorId", "authorid") ?? undefined,
      hash: get("trail_hash", "hash") ?? get("hash"),
      imageUrl: get("trail_imageUrl", "imageurl") ?? undefined,
      gpxFileUrl: get("trail_gpxFileUrl", "gpxfileurl") ?? undefined,
      coordinates: rawTrail["trail_coordinates"] ?? rawTrail["coordinates"] ?? undefined,
      createdAt: rawTrail["trail_createdAt"] ?? rawTrail["createdat"] ?? undefined,
      updatedAt: rawTrail["trail_updatedAt"] ?? rawTrail["updatedat"] ?? undefined,
      authorName: rawTrail["authorName"] ?? rawTrail["authorname"] ?? rawTrail["u_name"] ?? undefined,
    } as Trail
  }
  

  async findByAuthorId(authorId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const trail = await repository.findBy({ authorId: Equal(authorId) })

    return trail
  }
}
