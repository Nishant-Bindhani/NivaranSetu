import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassword'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'

const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(forgotPasswordSchema) })

  function onSubmit(data: ForgotPasswordForm) {
    mutate(data.email, { onSuccess: () => navigate('/reset-password', { state: { email: data.email } }) })
  }

  const errorMessage = getApiErrorMessage(error)

  return (
    <AuthLayout panelTitle="Forgot your password?">
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">Reset your password</h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          Enter your email and we'll send you a code to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" className="h-11 text-base" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send reset code'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
