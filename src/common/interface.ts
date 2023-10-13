export interface CommonRequest {
  user: {
    name: string
    account: string
    email: string
    id: number
    role: string
    iat: number
    exp: number
  }
}
