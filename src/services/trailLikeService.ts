import { TrailLikeHelper } from "../helpers/TrailLikeHelper"

export class TrailLikeService {
  constructor(protected helper: TrailLikeHelper) {}

  async createTrailLike(userId: string, trailId: string) {
    return this.helper.addLikeToTrail(userId, trailId)
  }

  async findTrailLike(authorId: string, trailId: string) {
    return this.helper.findTrailLike(authorId, trailId)
  }

  async deleteTrailLike(authorId: string, trailId: string) {
    return this.helper.deleteTrailLike(authorId, trailId)
  }
}
