import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'

// matches backend/src/modules/auth/auth.validation.ts's resetPasswordSchema
const resetPasswordSchema = z
  .object({
    code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? null
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { mutate, isPending, isSuccess, error } = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  if (!email) {
    return (
      <AuthLayout panelTitle="Reset your password">
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">Something's missing</h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            Request a reset code first before resetting your password.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              nativeButton={false}
              render={<Link to="/forgot-password">Forgot password?</Link>}
            />
          </div>
        </div>
      </AuthLayout>
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout panelTitle="Reset your password">
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">Password reset</h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            Your password has been reset successfully.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="h-12 px-8 text-base" nativeButton={false} render={<Link to="/login">Go to login</Link>} />
          </div>
        </div>
      </AuthLayout>
    )
  }

  function onSubmit(data: ResetPasswordForm) {
    if (!email) return
    mutate({ email, code: data.code, password: data.password })
  }

  const errorMessage = getApiErrorMessage(error) ?? 'That code is invalid or has expired.'

  return (
    <AuthLayout panelTitle="Reset your password">
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">Set a new password</h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          Enter the code sent to {email} and choose a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="code" className="text-sm">Code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              className="h-11 text-center text-lg tracking-[0.5em]"
              placeholder="------"
              {...register('code')}
            />
            {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="h-11 pr-10 text-base"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="size-4.5" />
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword" className="text-sm">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="h-11 pr-10 text-base"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <HugeiconsIcon icon={showConfirmPassword ? ViewOffIcon : ViewIcon} className="size-4.5" />
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          {error && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
