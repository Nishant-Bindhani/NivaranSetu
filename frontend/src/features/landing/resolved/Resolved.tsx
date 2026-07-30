import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkBadge01Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { useTypewriter } from '@/shared/hooks/useTypewriter'

const RECENT_RESOLUTIONS = [
  { title: 'Streetlight repaired', location: 'Sector 12, main road', time: '3 days' },
  { title: 'Water leak fixed', location: 'MG Road junction', time: '1 day' },
  { title: 'Pothole filled', location: 'Ring Road, near Metro station', time: '4 days' },
]

// claims about how the system is designed to work, not fabricated statistics —
// there's no real ticket volume yet to report a percentage honestly.
// `lead` types out big and bold; `rest` appears smaller and quieter once
// the lead is fully typed — real size/weight contrast, not one flat line
const CLAIMS = [
  { lead: 'Citizen sign-off.', rest: 'required on every closure.' },
  { lead: 'No self-certification.', rest: "an officer's word alone never closes a case." },
  { lead: 'Rejected proof reopens it.', rest: 'automatically, no phone calls needed.' },
]
const CLAIM_LEADS = CLAIMS.map((claim) => claim.lead)

export function Resolved() {
  const { text: typedLead, index, phase } = useTypewriter(CLAIM_LEADS, 40, 3200)
  const restText = CLAIMS[index].rest
  const showRest = phase === 'pausing'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-background py-24 dark:from-emerald-950/20 dark:via-transparent">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* left: the pitch, big typographic moment */}
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">
              Not just closed. Verified.
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-bold text-balance sm:text-5xl">
              A ticket only closes when{' '}
              <span className="text-emerald-600 dark:text-emerald-400">you</span> say it's done.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Officers submit before-and-after proof. You review it. If it's not actually
              fixed, it reopens automatically no arguing, no phone calls.
            </p>

            <div className="mt-10 border-t pt-6">
              <div className="flex h-32 items-start gap-4 overflow-hidden">
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  strokeWidth={2}
                  className="mt-1 size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                />
                <p className="max-w-md">
                  <span className="font-heading text-3xl leading-tight font-bold text-emerald-600 sm:text-4xl dark:text-emerald-400">
                    {typedLead}
                    <span className="animate-caret-blink border-r-3 border-current" />
                  </span>
                  <span
                    className={`mt-1 block text-base font-normal text-muted-foreground transition-all duration-300 ${
                      showRest ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  >
                    {restText}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* right: stacked recent resolutions — each one leads with an oversized
              duration number, the actual proof point (fast turnaround), not a
              fabricated aggregate stat */}
          <div className="space-y-3">
            {RECENT_RESOLUTIONS.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-5 rounded-xl border bg-card/80 p-5 backdrop-blur-sm"
              >
                <div className="flex shrink-0 flex-col items-center leading-none">
                  <span className="font-heading text-4xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {item.time.split(' ')[0]}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    {item.time.split(' ')[1]}
                  </span>
                </div>
                <div className="min-w-0 border-l pl-5">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                    <HugeiconsIcon icon={Location01Icon} strokeWidth={2} className="size-3.5 shrink-0" />
                    {item.location}
                  </p>
                </div>
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  strokeWidth={2}
                  className="ml-auto size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
