export const ROLE = {
  CITIZEN: 'CITIZEN',
  OFFICER: 'OFFICER',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
} as const

export type Role = (typeof ROLE)[keyof typeof ROLE]
