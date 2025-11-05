export class User {
  id?: string
  name: string
  email: string
  password?: string
  picture?: string
  provider?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(
    name: string,
    email: string,
    password?: string,
    picture?: string,
    provider?: string
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.picture = picture
    this.provider = provider
  }
}
