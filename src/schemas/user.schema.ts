import { EntitySchema } from "typeorm"
import { User } from "../models/User"

export const userSchema = new EntitySchema<User>({
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
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: true, // 👈 ahora puede ser null (usuarios Google)
    },
    picture: {
      type: "varchar",
      nullable: true, // 👈 foto de perfil del usuario (Google o futura)
    },
    provider: {
      type: "varchar",
      nullable: true, // 👈 'google', 'local', 'github', etc.
      default: "local",
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
    // Si más adelante un usuario tiene rutas, puedes reactivar esto:
    // routes: {
    //   type: "one-to-many",
    //   target: "Route",
    //   inverseSide: "user",
    // },
  },
})
