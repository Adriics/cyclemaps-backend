import { Equal } from "typeorm"
import dataSource from "../dataSourceServer"
import { Trail } from "../models/Trail"
import { trailSchema } from "../schemas/trail.schema"

export class TrailHelper {
  protected schema = trailSchema
  protected connection = dataSource

  async findAll(): Promise<Trail[]> {
    const repository = (await this.connection).getRepository(this.schema)

    return repository.find()
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
