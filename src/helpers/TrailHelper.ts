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
}
