import { api, type ApiSuccess } from '@/shared/lib/axios'
import type { AuthUser } from '@/shared/auth/authTypes'

export type RegisterInput = { email: string; password: string; name: string }
export type LoginInput = { email: string; password: string }
export type LoginResult = { accessToken: string; user: AuthUser }

export async function registerRequest(input: RegisterInput) {
  const response = await api.post<ApiSuccess<AuthUser>>('/auth/register', input)
  return response.data
}

export async function loginRequest(input: LoginInput) {
  const response = await api.post<ApiSuccess<LoginResult>>('/auth/login', input)
  return response.data
}
