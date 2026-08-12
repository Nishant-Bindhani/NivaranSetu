import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon, CheckmarkCircle02Icon, Copy01Icon } from '@hugeicons/core-free-icons'
import { Shimmer } from '@shimmer-from-structure/react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { useTicket } from '@/features/tickets/hooks/useTicket'
import { AuthedNavbar } from '@/features/dashboard/AuthedNavbar'

function SuccessScreen({ id }: { id: string }) {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex max-w-md flex-col items-center px-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-white/20">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-11" strokeWidth={2} />
        </div>

        <h1 className="mt-6 font-oswald text-3xl font-medium text-balance">Your complaint has been raised successfully!</h1>
        <p className="mt-3 text-white/90">We'll notify you as your complaint progresses.</p>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
          <span>Tracking ID: {id}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(id)}
            className="rounded p-1 hover:bg-white/20"
            aria-label="Copy tracking ID"
          >
            <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
          </button>
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(`/tickets/${id}`, { replace: true })}
          >
            View Complaint
          </Button>
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-white/90"
            nativeButton={false}
            render={<Link to="/citizen-dashboard" />}
          >
            Back to My Complaints
          </Button>
        </div>
      </div>
    </div>
  )
}

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const justCreated = Boolean((location.state as { justCreated?: boolean } | null)?.justCreated)
  const { data: ticket, isLoading, error } = useTicket(id ?? '')

  if (justCreated && id) {
    return (
      <>
        <AuthedNavbar />
        <SuccessScreen id={id} />
      </>
    )
  }

  return (
    <>
      <AuthedNavbar />
      <div className="mx-auto max-w-2xl p-6">
        <Link to="/citizen-dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          Back to My Complaints
        </Link>

        {error && <p className="mt-6 text-sm text-destructive">Complaint not found.</p>}

        {!error && (
          <Shimmer loading={isLoading}>
            <div className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h1 className="font-oswald text-2xl font-medium">{ticket?.title ?? 'Sample complaint title'}</h1>
                <Badge variant="outline">{ticket?.status ?? 'OPEN'}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{ticket?.category.name ?? 'Category'}</p>

              <h2 className="mt-6 text-sm font-medium text-muted-foreground">Description</h2>
              <p className="mt-2 text-sm">{ticket?.description ?? 'Sample description text goes here while this loads.'}</p>
            </div>
          </Shimmer>
        )}
      </div>
    </>
  )
}
