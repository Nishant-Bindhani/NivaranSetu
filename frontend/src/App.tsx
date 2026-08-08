import { Routes, Route } from 'react-router-dom'
import { Shimmer } from '@shimmer-from-structure/react'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/features/auth/login/LoginPage'
import { RegisterPage } from '@/features/auth/register/RegisterPage'
import { VerifyEmailPage } from '@/features/auth/verifyEmail/VerifyEmailPage'
import { OAuthCallbackPage } from '@/features/auth/oauthCallback/OAuthCallbackPage'
import { ForgotPasswordPage } from '@/features/auth/forgotPassword/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/resetPassword/ResetPasswordPage'
import { CitizenDashboardPage } from '@/features/dashboard/CitizenDashboardPage'
import { NewTicketPage } from '@/features/tickets/newTicket/NewTicketPage'
import { TicketDetailPage } from '@/features/tickets/ticketDetail/TicketDetailPage'
import { RedirectIfAuthed } from '@/features/auth/shared/RedirectIfAuthed'
import { RequireAuth } from '@/features/auth/shared/RequireAuth'
import { useSettings } from '@/shared/hooks/useSettings'
import { useSessionBootstrap } from '@/features/auth/hooks/useSessionBootstrap'

function App() {
  // useSettings()'s effect (theme/text-scale applied to <html>
  const { theme } = useSettings()

  const isBootstrapping = useSessionBootstrap()

  // Shimmer's white-based overlay only reads as visible contrast against
  // DARK backgrounds — on light mode's near-white background, white-on-white
  // is nearly invisible. Dark mode keeps the white overlay; light mode needs
  // a dark-based overlay instead for the same visible effect.
  const shimmerColors =
    theme === 'dark'
      ? { shimmerColor: 'rgba(255, 255, 255, 0.1)' }
      : { backgroundColor: 'rgba(0, 0, 0, 0.06)', shimmerColor: 'rgba(0, 0, 0, 0.14)' }

  return (
    <Shimmer loading={isBootstrapping} {...shimmerColors}>
      <Routes>
        <Route path="/" element={<RedirectIfAuthed><LandingPage /></RedirectIfAuthed>} />
        <Route path="/login" element={<RedirectIfAuthed><LoginPage /></RedirectIfAuthed>} />
        <Route path="/register" element={<RedirectIfAuthed><RegisterPage /></RedirectIfAuthed>} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/citizen-dashboard" element={<RequireAuth isBootstrapping={isBootstrapping}><CitizenDashboardPage /></RequireAuth>} />
        <Route path="/tickets/new" element={<RequireAuth isBootstrapping={isBootstrapping}><NewTicketPage /></RequireAuth>} />
        <Route path="/tickets/:id" element={<RequireAuth isBootstrapping={isBootstrapping}><TicketDetailPage /></RequireAuth>} />
      </Routes>
    </Shimmer>
  )
}

export default App
