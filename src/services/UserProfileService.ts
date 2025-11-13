// UserProfileService.ts
import { UserHelper } from "../helpers/UserHelper"
import { TrailHelper } from "../helpers/TrailHelper"
import { TrailLikeHelper } from "../helpers/TrailLikeHelper"
import { Trail } from "../models/Trail"

export class UserProfileService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly trailHelper: TrailHelper,
    private readonly trailLikeHelper: TrailLikeHelper
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.userHelper.findById(userId)

    if (!user) return null

    const createdTrails: Trail[] = await this.trailHelper.findByAuthorId(userId)
    const likedTrailLikes = await this.trailLikeHelper.findTrailsLikedByUser(
      userId
    )
    const likedTrails: Trail[] = likedTrailLikes
      .map((tl) => tl.trail!)
      .filter(Boolean)

    const stats = {
      trailsCreated: createdTrails.length,
      trailsLiked: likedTrails.length,
      totalDistance: createdTrails.reduce(
        (sum: number, trail: Trail) => sum + trail.distance,
        0
      ),
      totalElevation: createdTrails.reduce(
        (sum: number, trail: Trail) => sum + trail.elevationGain,
        0
      ),
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      stats,
      createdTrails,
      likedTrails,
    }
  }
}
