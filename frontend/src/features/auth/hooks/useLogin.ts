import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      dispatch(setCredentials(response.data))
    },
  })
}
