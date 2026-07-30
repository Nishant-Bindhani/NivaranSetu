import { useEffect, useState } from 'react'
import i18n from '@/i18n/config'

type Theme = 'light' | 'dark'
type Language = 'en' | 'hi'

const TEXT_SCALE_STEPS = [0.9, 1, 1.1, 1.2]
const STORAGE_KEY = 'nivaransetu-settings'

type Settings = {
  theme: Theme
  textScaleIndex: number
  language: Language
}

function loadSettings(): Settings {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved) as Settings

  return {
    theme: 'light',
    textScaleIndex: 1,
    language: 'en',
  }
}

export function useSettings() {
  /*
   * `loadSettings` is passed WITHOUT calling it (no parentheses).
   * React only invokes it once, on the very first render — this is React's
   * "lazy initializer" pattern. If we wrote `useState(loadSettings())`
   * instead, that function would run and re-parse localStorage on every
   * single re-render, which is wasted work for a value that never needs
   * recomputing after the initial load.
   */
  const [settings, setSettings] = useState<Settings>(loadSettings)

  // apply settings to the page whenever they change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
    document.documentElement.style.setProperty('--text-scale', String(TEXT_SCALE_STEPS[settings.textScaleIndex]))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  return {
    theme: settings.theme,
    setTheme: (theme: Theme) => setSettings((s) => ({ ...s, theme })),

    textScaleIndex: settings.textScaleIndex,
    increaseTextSize: () =>
      setSettings((s) => ({ ...s, textScaleIndex: Math.min(s.textScaleIndex + 1, TEXT_SCALE_STEPS.length - 1) })),
    decreaseTextSize: () =>
      setSettings((s) => ({ ...s, textScaleIndex: Math.max(s.textScaleIndex - 1, 0) })),
    resetTextSize: () => setSettings((s) => ({ ...s, textScaleIndex: 1 })),

    language: settings.language,
    /*
     * Two independent things need to happen here, not one:
     * 1. i18n.changeLanguage() tells the i18next ENGINE to switch — every
     *    component elsewhere using useTranslation() re-renders with new
     *    text automatically, via i18next's own React Context subscription.
     *    This has nothing to do with THIS hook's own state.
     * 2. setSettings() keeps this hook's own record in sync, so
     *    `settings.language` correctly reports the new value (used to
     *    highlight the right EN/HI button) and gets persisted to
     *    localStorage by the effect above.
     * Skipping either one leaves the UI out of sync with what's displayed.
     */
    setLanguage: (language: Language) => {
      i18n.changeLanguage(language)
      setSettings((s) => ({ ...s, language }))
    },
  }
}
