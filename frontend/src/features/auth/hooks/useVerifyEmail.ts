import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { verifyEmailRequest } from '@/features/auth/api/authApi'

// fires automatically once, as soon as a token is available — not user-triggered,
// so useMutation is driven manually here instead of from a click handler.
export function useVerifyEmail(token: string | null) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: verifyEmailRequest,
  })

  useEffect(() => {
    if (token) {
      mutate(token)
    }
  }, [token, mutate])

  return mutation
}
