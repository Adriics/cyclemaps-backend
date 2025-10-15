import { Equal } from "typeorm"
import { User } from "../models/User"
import dataSource from "../dataSourceConfig"
import { UserSchema } from "../schemas/user.schema"

export class UserHelper {
  protected schema = UserSchema
  protected connection = dataSource

  async findById(id: string): Promise<User | null> {
    return dataSource
      .getRepository("User")
      .findOneBy({ id }) as Promise<User | null>
  }

  async create(user: User): Promise<User> {
    return dataSource.getRepository("User").save(user) as Promise<User>
  }

  async findByEmail(email: string): Promise<User | null> {
    return dataSource.getRepository("User").findOneBy({
      email: Equal(email),
    }) as Promise<User | null>
  }

  async findByEmailAndPassword(email: string, password: string) {
    const repository = await this.connection.getRepository(this.schema)

    const user = await repository.findOneBy({
      email: Equal(email),
      password: Equal(password),
    })

    return user
  }
}
