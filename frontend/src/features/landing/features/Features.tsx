import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Clock01Icon,
  Route01Icon,
  ShieldKeyIcon,
  CheckmarkBadge01Icon,
} from '@hugeicons/core-free-icons'
import { NoisyGradient } from '@/features/landing/shared/bgpatterns/NoisyGradient'

const FEATURES = [
  { icon: Clock01Icon, key: 'timeBound' },
  { icon: Route01Icon, key: 'routing' },
  { icon: CheckmarkBadge01Icon, key: 'verifiedClosure' },
  { icon: ShieldKeyIcon, key: 'private' },
]

export function Features() {
  const { t: translate } = useTranslation('landing')

  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-r from-rose-50 via-background to-background py-24 dark:from-transparent">
      <NoisyGradient />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        {/* left column stays in view while the list scrolls past on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium tracking-[0.15em] text-primary uppercase">
            {translate('features.eyebrow')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
            {translate('features.title')}
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            {translate('features.body')}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.key} className="bg-card p-8">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={feature.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{translate(`features.items.${feature.key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{translate(`features.items.${feature.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
