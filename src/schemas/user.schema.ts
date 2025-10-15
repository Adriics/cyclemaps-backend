import { EntitySchema } from "typeorm"
import { User } from "../models/User"

export const UserSchema = new EntitySchema<User>({
  name: "User",
  tableName: "user",
  target: User,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    /*  routes: {
      type: "one-to-many",
      target: "Route",
      inverseSide: "user",
    }, */
  },
})
