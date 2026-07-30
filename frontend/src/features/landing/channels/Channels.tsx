import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import { Globe02Icon, WhatsappIcon, Mail01Icon } from '@hugeicons/core-free-icons'

const CHANNELS = [
  { icon: Globe02Icon, key: 'web', color: 'bg-sky-500/15 text-sky-400' },
  { icon: WhatsappIcon, key: 'whatsapp', color: 'bg-emerald-500/15 text-emerald-400' },
  { icon: Mail01Icon, key: 'email', color: 'bg-amber-500/15 text-amber-400' },
]

export function Channels() {
  const { t: translate } = useTranslation('landing')

  return (
    <section className="relative overflow-hidden bg-zinc-900 py-20 text-white">
      {/* dot texture — fixed white (not a theme token), since this band is always dark */}
      <div
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{translate('channels.title')}</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-white/60">
          {translate('channels.subtitle')}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div key={channel.key} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className={`grid size-11 place-items-center rounded-full ${channel.color}`}>
                <HugeiconsIcon icon={channel.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{translate(`channels.options.${channel.key}.title`)}</h3>
              <p className="mt-1 text-sm text-white/60">{translate(`channels.options.${channel.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
