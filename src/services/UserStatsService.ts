import { TrailHelper } from "../helpers/TrailHelper"
import { TrailLikeHelper } from "../helpers/TrailLikeHelper"

export class UserStatsService {
  constructor(
    private readonly trailHelper: TrailHelper,
    private readonly trailLikeHelper: TrailLikeHelper
  ) {}

  async getStatsByUserId(userId: string) {
    const trails = await this.trailHelper.findByAuthorId(userId)
    const totalDistance = trails.reduce((acc, t) => acc + t.distance, 0)
    const totalElevation = trails.reduce((acc, t) => acc + t.elevationGain, 0)
    const trailsCreated = trails.length

    const trailsLiked = await this.trailLikeHelper.countByUserId(userId)

    return { totalDistance, totalElevation, trailsCreated, trailsLiked }
  }

  async getCreatedTrails(userId: string) {
    return this.trailHelper.findByAuthorId(userId)
  }

  async getLikedTrails(userId: string) {
    return this.trailLikeHelper.findTrailsLikedByUser(userId)
  }
}
