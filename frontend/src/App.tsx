import { Routes, Route } from 'react-router-dom'
import { Shimmer } from '@shimmer-from-structure/react'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/features/auth/login/LoginPage'
import { RegisterPage } from '@/features/auth/register/RegisterPage'
import { VerifyEmailPage } from '@/features/auth/verifyEmail/VerifyEmailPage'
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<div className="p-6">Dashboard (coming soon)</div>} />
      </Routes>
    </Shimmer>
  )
}

export default App
