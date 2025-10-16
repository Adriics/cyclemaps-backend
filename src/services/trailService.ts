import { TrailHelper } from "../helpers/TrailHelper"
import { Trail } from "../models/Trail"

export class TrailService {
  constructor(private readonly helper: TrailHelper) {}

  async getTrails(): Promise<Trail[] | null> {
    return this.helper.findAll()
  }
}
