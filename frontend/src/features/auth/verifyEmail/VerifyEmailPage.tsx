import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useVerifyEmail } from '@/features/auth/hooks/useVerifyEmail'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'
import { postLoginRedirect } from '@/features/auth/shared/postLoginRedirect'
import type { RootState } from '@/store/store'

// matches backend/src/modules/auth/auth.validation.ts's verifyEmailSchema
const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
})

type CodeForm = z.infer<typeof codeSchema>

export function VerifyEmailPage() {
  const { t: translate } = useTranslation('landing')
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? null
  const user = useSelector((state: RootState) => state.auth.user)

  const { mutate, isPending, isSuccess, error } = useVerifyEmail()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeForm>({ resolver: zodResolver(codeSchema) })

  const panelTitle = translate('auth.verifyEmail.panelTitle')

  if (!email) {
    return (
      <AuthLayout panelTitle={panelTitle}>
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">
            {translate('auth.verifyEmail.errorTitle')}
          </h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            {translate('auth.verifyEmail.missingEmailBody')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              nativeButton={false}
              render={<Link to="/register">{translate('auth.register.formTitle')}</Link>}
            />
          </div>
        </div>
      </AuthLayout>
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout panelTitle={panelTitle}>
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">
            {translate('auth.verifyEmail.successTitle')}
          </h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            {translate('auth.verifyEmail.successBody')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              nativeButton={false}
              render={<Link to={user ? postLoginRedirect(user.role) : '/login'}>{translate('auth.verifyEmail.loginLink')}</Link>}
            />
          </div>
        </div>
      </AuthLayout>
    )
  }

  function onSubmit(data: CodeForm) {
    if (!email) return
    mutate({ email, code: data.code })
  }

  const errorMessage = getApiErrorMessage(error) ?? translate('auth.verifyEmail.errorBody')

  return (
    <AuthLayout panelTitle={panelTitle}>
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">
          {translate('auth.verifyEmail.formTitle')}
        </h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          {translate('auth.verifyEmail.formSubtitle', { email })}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6">
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            className="h-16 py-2 text-center text-3xl font-semibold tracking-[0.6em]"
            placeholder="------"
            {...register('code')}
          />
          {errors.code && <p className="text-center text-sm text-destructive">{errors.code.message}</p>}
          {error && <p className="text-center text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isPending}>
            {isPending ? 'Verifying...' : 'Verify email'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
