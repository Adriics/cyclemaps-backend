export class Trail {
  id?: string
  name: string
  description: string
  distance: number
  elevationGain: number
  difficulty: "easy" | "medium" | "hard"
  authorId: string
  authorName?: string
  hash?: string
  imageUrl?: string
  gpxFileUrl?: string
  coordinates?: [number, number][] // ← AÑADIR ESTO
  createdAt?: Date
  updatedAt?: Date

  constructor(
    name: string,
    description: string,
    distance: number,
    elevationGain: number,
    difficulty: "easy" | "medium" | "hard",
    authorId: string,
    authorName?: string,
    hash?: string,
    imageUrl?: string,
    gpxFileUrl?: string,
    coordinates?: [number, number][]
  ) {
    this.name = name
    this.description = description
    this.distance = distance
    this.elevationGain = elevationGain
    this.difficulty = difficulty
    this.authorId = authorId
    this.authorName = authorName
    this.hash = hash
    this.imageUrl = imageUrl
    this.gpxFileUrl = gpxFileUrl
    this.coordinates = coordinates
  }
}
