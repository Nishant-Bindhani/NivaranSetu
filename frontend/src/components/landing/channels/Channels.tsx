import { HugeiconsIcon } from '@hugeicons/react'
import { Globe02Icon, WhatsappIcon, Mail01Icon } from '@hugeicons/core-free-icons'

const CHANNELS = [
  {
    icon: Globe02Icon,
    title: 'Web',
    body: 'Fill a short form, attach a photo, drop a pin. Done in under two minutes.',
    color: 'bg-sky-500/15 text-sky-400',
  },
  {
    icon: WhatsappIcon,
    title: 'WhatsApp',
    body: "Message a photo and a line of text to a number you've already got saved.",
    color: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: Mail01Icon,
    title: 'Email',
    body: 'Send it the old-fashioned way. It still gets read and tracked like everything else.',
    color: 'bg-amber-500/15 text-amber-400',
  },
]

export function Channels() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-20 text-white">
      {/* dot texture — fixed white (not a theme token), since this band is always dark */}
      <div
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">File it your way</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-white/60">
          No new app to learn. Reach out however's easiest.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div key={channel.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className={`grid size-11 place-items-center rounded-full ${channel.color}`}>
                <HugeiconsIcon icon={channel.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{channel.title}</h3>
              <p className="mt-1 text-sm text-white/60">{channel.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
