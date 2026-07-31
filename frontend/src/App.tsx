import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/features/auth/login/LoginPage'
import { RegisterPage } from '@/features/auth/register/RegisterPage'
import { VerifyEmailPage } from '@/features/auth/verifyEmail/VerifyEmailPage'
import { useSettings } from '@/shared/hooks/useSettings'
import { useSessionBootstrap } from '@/features/auth/hooks/useSessionBootstrap'

function App() {
  /*
   * useSettings()'s effect (theme/text-scale applied to <html>, localStorage
   * persistence) must run on every page load regardless of whether the
   * Settings popover is ever opened. SettingsMenu.tsx also calls this same
   * hook — Popover content doesn't mount until opened, so that copy alone
   * never ran on first load. Calling the hook here too guarantees the
   * effect always fires once, right when the app mounts.
   */
  useSettings()

  const isBootstrapping = useSessionBootstrap()

  if (isBootstrapping) {
    return null
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<div className="p-6">Dashboard (coming soon)</div>} />
    </Routes>
  )
}

export default App
