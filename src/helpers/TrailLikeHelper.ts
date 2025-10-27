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
}
