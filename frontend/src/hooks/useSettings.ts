import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Language = 'en' | 'hi'

const TEXT_SCALE_STEPS = [0.9, 1, 1.1, 1.2]
const STORAGE_KEY = 'nivaransetu-settings'

type Settings = {
  theme: Theme
  textScaleIndex: number
  highContrast: boolean
  language: Language
}

function loadSettings(): Settings {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved) as Settings

  return {
    theme: 'light',
    textScaleIndex: 1,
    highContrast: false,
    language: 'en',
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  // apply settings to the page whenever they change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
    document.documentElement.style.setProperty('--text-scale', String(TEXT_SCALE_STEPS[settings.textScaleIndex]))
    document.documentElement.setAttribute('data-contrast', settings.highContrast ? 'high' : 'normal')
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

    highContrast: settings.highContrast,
    setHighContrast: (highContrast: boolean) => setSettings((s) => ({ ...s, highContrast })),

    language: settings.language,
    setLanguage: (language: Language) => setSettings((s) => ({ ...s, language })),
  }
}
