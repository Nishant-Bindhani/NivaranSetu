// matches backend/src/prisma/schema.prisma's Role enum exactly
export type Role = 'CITIZEN' | 'OFFICER' | 'MANAGER' | 'ADMIN'

// shape returned inside { data: { user } } from POST /auth/login
export type AuthUser = {
  id: string
  email: string
  name: string
  role: Role
}
