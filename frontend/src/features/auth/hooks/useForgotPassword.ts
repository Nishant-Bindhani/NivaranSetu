import { useMutation } from '@tanstack/react-query'
import { forgotPasswordRequest } from '@/features/auth/api/authApi'

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordRequest,
  })
}
