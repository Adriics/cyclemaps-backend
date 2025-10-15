export class Trail {
  id?: string
  name: string
  description: string
  distance: string
  elevationGain: Date
  difficulty: Date
  authorId: string
  imageUrl: string

  constructor(
    name: string,
    description: string,
    distance: string,
    elevationGain: Date,
    difficulty: Date,
    authorId: string,
    imageUrl: string
  ) {
    this.name = name
    this.description = description
    this.distance = distance
    this.elevationGain = elevationGain
    this.difficulty = difficulty
    this.authorId = authorId
    this.imageUrl = imageUrl
  }
}
