import { useMutation } from '@tanstack/react-query'
import { registerRequest } from '@/features/auth/api/authApi'

// no Redux dispatch here — registering does NOT log the user in.
// The backend requires email verification before /auth/login will work.
export function useRegister() {
  return useMutation({
    mutationFn: registerRequest,
  })
}
