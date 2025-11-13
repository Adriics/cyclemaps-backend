import { Equal } from "typeorm"
import dataSource from "../dataSourceConfig"
import { userSchema } from "../schemas/user.schema"

export class UserTrailHelper {
  protected schema = userSchema
  protected connection = dataSource

  async getStats(userId: string) {
    return dataSource
      .getRepository(this.schema)
      .findOneBy({ id: Equal(userId) })
  }
}
