import type { Role } from '@/shared/auth/authTypes'

// only /citizen-dashboard exists today — other roles' pages aren't built
// yet, so they fall back to it too until then.
export function postLoginRedirect(role: Role): string {
  switch (role) {
    case 'OFFICER':
      return '/citizen-dashboard'
    case 'MANAGER':
      return '/citizen-dashboard'
    case 'ADMIN':
      return '/citizen-dashboard'
    case 'CITIZEN':
    default:
      return '/citizen-dashboard'
  }
}
