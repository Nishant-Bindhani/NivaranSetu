import { HugeiconsIcon } from '@hugeicons/react'
import { Settings01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
} from '@/shared/ui/popover'
import { useSettings } from '@/shared/hooks/useSettings'

// the actual controls, reused by both the desktop popover and the mobile accordion
export function SettingsControls() {
  const settings = useSettings()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span>Theme</span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={settings.theme === 'light' ? 'default' : 'outline'}
            onClick={() => settings.setTheme('light')}
          >
            Light
          </Button>
          <Button
            size="sm"
            variant={settings.theme === 'dark' ? 'default' : 'outline'}
            onClick={() => settings.setTheme('dark')}
          >
            Dark
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Text size</span>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={settings.decreaseTextSize} aria-label="Decrease text size">
            A-
          </Button>
          <Button size="sm" variant="outline" onClick={settings.resetTextSize} aria-label="Reset text size">
            A
          </Button>
          <Button size="sm" variant="outline" onClick={settings.increaseTextSize} aria-label="Increase text size">
            A+
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Language</span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={settings.language === 'en' ? 'default' : 'outline'}
            onClick={() => settings.setLanguage('en')}
          >
            EN
          </Button>
          <Button
            size="sm"
            variant={settings.language === 'hi' ? 'default' : 'outline'}
            onClick={() => settings.setLanguage('hi')}
          >
            HI
          </Button>
        </div>
      </div>
    </div>
  )
}

// desktop version — gear icon that opens a floating popover
export function SettingsMenu() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Settings"
            className="cursor-pointer hover:bg-transparent"
          />
        }
      >
        <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} className="size-5" />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverTitle>Settings</PopoverTitle>
        <SettingsControls />
      </PopoverContent>
    </Popover>
  )
}
