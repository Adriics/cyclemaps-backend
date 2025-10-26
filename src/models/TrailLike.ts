import { Trail } from "./Trail"
import { User } from "./User"

export class TrailLike {
  id?: string
  userId: string
  trailId: string
  createdAt?: Date
  user?: User
  trail?: Trail

  constructor(userId: string, trailId: string) {
    this.userId = userId
    this.trailId = trailId
  }
}
