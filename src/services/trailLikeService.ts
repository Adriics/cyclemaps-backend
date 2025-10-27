import { TrailLikeHelper } from "../helpers/TrailLikeHelper"

export class TrailLikeService {
  constructor(protected helper: TrailLikeHelper) {}

  async createTrailLike(userId: string, trailId: string) {
    return this.helper.addLikeToTrail(userId, trailId)
  }
}
