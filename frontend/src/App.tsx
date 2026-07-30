import { LandingPage } from '@/pages/LandingPage'
import { useSettings } from '@/shared/hooks/useSettings'

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

  return <LandingPage />
}

export default App
