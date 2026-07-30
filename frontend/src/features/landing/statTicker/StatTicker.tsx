import { useTranslation } from 'react-i18next'

const STAT_KEYS = ['resolved', 'avgTime', 'departments', 'citizens']
// honest placeholder values — no real ticket data exists yet, see MapShowcase/Resolved
const STAT_VALUES: Record<string, string> = {
  resolved: '0',
  avgTime: '—',
  departments: '0',
  citizens: '0',
}

// one item in the scrolling row
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 px-8">
      <span className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{value}</span>
      <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
      <span className="ml-8 text-primary/40" aria-hidden="true">
        ✦
      </span>
    </div>
  )
}

export function StatTicker() {
  const { t: translate } = useTranslation('landing')

  return (
    <section className="overflow-hidden border-y bg-gradient-to-r from-primary/5 via-background to-primary/5 py-14">
      <p className="mb-8 text-center text-sm text-muted-foreground">
        {translate('statTicker.caption')}
      </p>

      {/* the mask fades both edges so items appear/disappear smoothly */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* rendered twice so the scroll loops seamlessly at -50% */}
          {[...STAT_KEYS, ...STAT_KEYS].map((key, index) => (
            <StatItem key={index} value={STAT_VALUES[key]} label={translate(`statTicker.stats.${key}`)} />
          ))}
        </div>
      </div>
    </section>
  )
}
