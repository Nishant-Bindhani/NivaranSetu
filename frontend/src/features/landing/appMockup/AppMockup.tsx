import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  BulbIcon,
  Flag02Icon,
  ViewIcon,
  UserCheck01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'

const STEP_ICONS = [Flag02Icon, ViewIcon, UserCheck01Icon, CheckmarkCircle01Icon]
const STEP_KEYS = ['reported', 'reviewed', 'assigned', 'resolved']

const STEP_DURATION_MS = 1800

export function AppMockup() {
  const { t: translate } = useTranslation('landing')
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((step) => (step + 1) % STEP_KEYS.length)
    }, STEP_DURATION_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-lg">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b bg-secondary/50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 text-xs text-muted-foreground">{translate('hero.appMockup.windowTitle')}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
            <HugeiconsIcon icon={BulbIcon} strokeWidth={2} className="size-3.5" />
            {translate('hero.appMockup.category')}
          </span>
          <span className="text-xs text-muted-foreground">{translate('hero.appMockup.ticketNumber')}</span>
        </div>

        <p className="mt-3 text-sm font-semibold">{translate('hero.appMockup.complaintTitle')}</p>

        <div className="mt-6 flex justify-between">
          {STEP_KEYS.map((key, index) => {
            const isDone = index < activeStep
            const isActive = index === activeStep

            return (
              <div key={key} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={`grid size-8 place-items-center rounded-full border-2 transition-all duration-500 ${
                    isDone
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isActive
                        ? 'scale-110 border-primary bg-background text-primary'
                        : 'border-border bg-background text-muted-foreground'
                  }`}
                >
                  <HugeiconsIcon icon={STEP_ICONS[index]} strokeWidth={2} className="size-4" />
                </span>
                <span
                  className={`text-center text-[10px] transition-colors duration-500 ${
                    isDone || isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {translate(`hero.appMockup.steps.${key}`)}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((activeStep + 1) / STEP_KEYS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
