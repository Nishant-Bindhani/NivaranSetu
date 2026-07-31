import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export type ApiSuccess<T> = { success: true; data: T; message: string }

export function getApiErrorMessage(error: unknown): string | undefined {
  if (error instanceof AxiosError) {
    return error.response?.data?.error?.message
  }
  return undefined
}
