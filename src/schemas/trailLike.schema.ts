import { EntitySchema } from "typeorm"
import { TrailLike } from "../models/TrailLike"

export const trailLikeSchema = new EntitySchema<TrailLike>({
  name: "trail_like",
  tableName: "trail_likes",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      name: "user_id",
    },
    trailId: {
      type: "uuid",
      name: "trail_id",
    },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    users: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    trail: {
      type: "many-to-one",
      target: "Trail",
      joinColumn: { name: "trail_id" },
      onDelete: "CASCADE",
    },
  },
  uniques: [
    {
      name: "unique_user_trail_like",
      columns: ["userId", "trailId"],
    },
  ],
})
