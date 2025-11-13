import { Trail } from "./Trail"
import { User } from "./User"

export interface UserWithStats extends User {
  stats: {
    totalDistance: number
    totalElevation: number
    trailsCreated: number
    trailsLiked: number
  }
  createdTrails: Trail[]
  likedTrails: Trail[]
}
