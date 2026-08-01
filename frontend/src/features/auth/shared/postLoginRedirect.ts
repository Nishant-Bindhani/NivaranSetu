import type { Role } from '@/shared/auth/authTypes'

// only /dashboard exists today — other roles' pages aren't built yet, so
// they fall back to it too until then.
export function postLoginRedirect(role: Role): string {
  switch (role) {
    case 'OFFICER':
      return '/dashboard'
    case 'MANAGER':
      return '/dashboard'
    case 'ADMIN':
      return '/dashboard'
    case 'CITIZEN':
    default:
      return '/dashboard'
  }
}
