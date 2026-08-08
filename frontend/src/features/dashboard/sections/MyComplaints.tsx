import { Link } from 'react-router-dom'
import { Shimmer } from '@shimmer-from-structure/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { FileEmpty02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useMyTickets } from '@/features/tickets/hooks/useMyTickets'
import type { TicketStatus } from '@/features/tickets/api/ticketsApi'

const STATUS_VARIANT: Record<TicketStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  OPEN: 'default',
  ASSIGNED: 'secondary',
  IN_PROGRESS: 'secondary',
  ESCALATED: 'destructive',
  RESOLVED: 'outline',
  CLOSED: 'outline',
  REOPENED: 'destructive',
}

export function MyComplaints() {
  const { data: tickets, isLoading, error } = useMyTickets()

  return (
    <section className="mx-auto max-w-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Your Complaints</h2>
        <Button size="sm" nativeButton={false} render={<Link to="/tickets/new">+ File a Complaint</Link>} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {isLoading && (
          <Shimmer loading>
            <div className="flex flex-col gap-3">
              {[0, 1].map((i) => (
                <Card key={i} size="sm">
                  <CardHeader>
                    <CardTitle>Sample complaint title</CardTitle>
                    <CardDescription>Category</CardDescription>
                    <CardAction>
                      <Badge>OPEN</Badge>
                    </CardAction>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Shimmer>
        )}

        {error && <p className="text-sm text-destructive">Couldn't load your complaints. Try refreshing.</p>}

        {!isLoading && !error && tickets?.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <HugeiconsIcon icon={FileEmpty02Icon} className="size-7 text-primary" />
            </div>
            <p className="font-medium">No complaints yet</p>
            <p className="max-w-xs text-sm text-muted-foreground">Report an issue in your area and we'll get it to the right department.</p>
          </div>
        )}

        {tickets?.map((ticket) => (
          <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="group">
            <Card className="border-l-4 border-l-primary/60 transition-all group-hover:-translate-y-0.5 group-hover:border-l-primary group-hover:shadow-lg group-hover:shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-base">{ticket.title}</CardTitle>
                <CardDescription>{ticket.category.name}</CardDescription>
                <CardAction className="flex items-center gap-2">
                  <Badge variant={STATUS_VARIANT[ticket.status]}>{ticket.status}</Badge>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </CardAction>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
