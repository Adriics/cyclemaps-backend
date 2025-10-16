import { EntitySchema } from "typeorm"
import { Trail } from "../models/Trail"

export const trailSchema = new EntitySchema<Trail>({
  name: "Trail",
  tableName: "trails",
  target: Trail,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    distance: {
      type: "float",
      nullable: false,
    },
    elevationGain: {
      type: "integer",
      nullable: false,
    },
    difficulty: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    authorId: {
      type: "uuid",
      nullable: false,
    },
    imageUrl: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    gpxFileUrl: {
      type: "varchar",
      length: 255,
      nullable: true,
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
})
