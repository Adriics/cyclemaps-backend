import dataSource from "../dataSourceConfig"
import { trailLikeSchema } from "../schemas/trailLike.schema"
import { Equal } from "typeorm"

export class TrailLikeHelper {
  protected schema = trailLikeSchema
  protected connection = dataSource

  async addLikeToTrail(userId: string, trailId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const existing = await repository.findOneBy({
      userId: Equal(userId),
      trailId: Equal(trailId),
    } as any)

    if (existing) {
      return existing
    }

    return repository.save({
      userId,
      trailId,
    })
  }

  async findTrailLike(authorId: string, trailId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const existsLike = await repository.findOneBy({
      userId: Equal(authorId),
      trailId: Equal(trailId),
    } as any)

    return existsLike
  }

  async deleteTrailLike(authorId: string, trailId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const result = await repository.delete({
      userId: Equal(authorId),
      trailId: Equal(trailId),
    })

    return result.affected ? result.affected > 0 : false
  }

  async getLikedTrailsByUser(userId: string) {
    const repository = (await this.connection).getRepository(this.schema)

    const likedTrails = repository.findBy({ userId: Equal(userId) })

    return likedTrails
  }
}
