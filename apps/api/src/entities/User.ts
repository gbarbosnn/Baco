export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
  role: string
}