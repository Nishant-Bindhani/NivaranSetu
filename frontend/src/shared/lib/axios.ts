import axios, { AxiosError } from 'axios'

export const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export type ApiSuccess<T> = { success: true; data: T; message: string }

export function getApiErrorMessage(error: unknown): string | undefined {
  if (error instanceof AxiosError) {
    return error.response?.data?.error?.message
  }
  return undefined
}
