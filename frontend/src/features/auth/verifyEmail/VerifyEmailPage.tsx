import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useVerifyEmail } from '@/features/auth/hooks/useVerifyEmail'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'

export function VerifyEmailPage() {
  const { t: translate } = useTranslation('landing')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const { isSuccess, isError, error } = useVerifyEmail(token)

  const panelTitle = translate('auth.verifyEmail.panelTitle')

  if (!token) {
    return (
      <AuthLayout panelTitle={panelTitle}>
        <VerifyMessage title={translate('auth.verifyEmail.errorTitle')} body={translate('auth.verifyEmail.missingTokenBody')} />
      </AuthLayout>
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout panelTitle={panelTitle}>
        <VerifyMessage title={translate('auth.verifyEmail.successTitle')} body={translate('auth.verifyEmail.successBody')}>
          <Link to="/login" className="font-medium text-primary underline underline-offset-4">
            {translate('auth.login.formTitle')}
          </Link>
        </VerifyMessage>
      </AuthLayout>
    )
  }

  if (isError) {
    const errorMessage = getApiErrorMessage(error) ?? translate('auth.verifyEmail.errorBody')
    return (
      <AuthLayout panelTitle={panelTitle}>
        <VerifyMessage title={translate('auth.verifyEmail.errorTitle')} body={errorMessage}>
          <Link to="/register" className="font-medium text-primary underline underline-offset-4">
            {translate('auth.register.formTitle')}
          </Link>
        </VerifyMessage>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout panelTitle={panelTitle}>
      <VerifyMessage title={translate('auth.verifyEmail.verifying')} />
    </AuthLayout>
  )
}

function VerifyMessage({ title, body, children }: { title: string; body?: string; children?: ReactNode }) {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
      {body && <p className="mt-2 text-center text-base text-muted-foreground">{body}</p>}
      {children && <p className="mt-6 text-center text-base text-muted-foreground">{children}</p>}
    </div>
  )
}
