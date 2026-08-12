import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shimmer } from '@shimmer-from-structure/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { FileEmpty02Icon, Search01Icon, Calendar03Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover'
import { useMyTickets } from '@/features/tickets/hooks/useMyTickets'
import type { TicketStatus } from '@/features/tickets/api/ticketsApi'
import { useLoadMoreOnScroll } from '@/shared/hooks/useLoadMoreOnScroll'
import { cn } from '@/shared/lib/utils'

function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const STATUS_VARIANT: Record<TicketStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  OPEN: 'default',
  ASSIGNED: 'secondary',
  IN_PROGRESS: 'secondary',
  ESCALATED: 'destructive',
  RESOLVED: 'outline',
  CLOSED: 'outline',
  REOPENED: 'destructive',
}

const STATUS_OPTIONS: TicketStatus[] = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED', 'CLOSED', 'REOPENED']

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export function MyComplaints() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<TicketStatus | ''>('')
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date())

  const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } = useMyTickets({
    search: search || undefined,
    status: status || undefined,
    dateFrom: dateFrom ? toISODate(dateFrom) : undefined,
    dateTo: dateTo ? toISODate(dateTo) : undefined,
  })

  const tickets = useMemo(() => data?.pages.flatMap((page) => page.data.tickets) ?? [], [data])

  const loadMore = useCallback(() => fetchNextPage(), [fetchNextPage])
  const markerRef = useLoadMoreOnScroll(loadMore, Boolean(hasNextPage))

  return (
    <section className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-xl font-medium tracking-tight uppercase">Your Complaints</h2>
        <Button size="sm" nativeButton={false} render={<Link to="/tickets/new">+ File a Complaint</Link>} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[160px]">
          <HugeiconsIcon icon={Search01Icon} className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search complaints..." className="pl-7" />
        </div>
        <Select
          value={status || 'ALL'}
          onValueChange={(value) => setStatus(value === 'ALL' ? '' : (value as TicketStatus))}
          items={[{ value: 'ALL', label: 'All statuses' }, ...STATUS_OPTIONS.map((s) => ({ value: s, label: s }))]}
        >
          <SelectTrigger className="w-auto min-w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5">
                <HugeiconsIcon icon={Calendar03Icon} className="size-3.5" />
                {dateFrom ? `From ${dateFormatter.format(dateFrom)}` : 'Start date'}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              disabled={{ after: dateTo ?? new Date() }}
              endMonth={dateTo ?? new Date()}
            />
            {dateFrom && (
              <div className="flex justify-end border-t p-2">
                <Button variant="ghost" size="sm" onClick={() => setDateFrom(undefined)}>
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5">
                <HugeiconsIcon icon={Calendar03Icon} className="size-3.5" />
                {dateTo ? `To ${dateFormatter.format(dateTo)}` : 'End date'}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={(date) => date && setDateTo(date)}
              disabled={dateFrom ? { before: dateFrom, after: new Date() } : { after: new Date() }}
              endMonth={new Date()}
            />
            <div className="flex justify-end border-t p-2">
              <Button variant="ghost" size="sm" onClick={() => setDateTo(new Date())}>
                Today
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="animate-in fade-in mt-4 duration-500">
        {error && <p className="text-sm text-destructive">Couldn't load your complaints. Try refreshing.</p>}

        {!isLoading && !error && tickets.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <HugeiconsIcon icon={FileEmpty02Icon} className="size-7 text-primary" />
            </div>
            <p className="font-medium">No complaints yet</p>
            <p className="max-w-xs text-sm text-muted-foreground">Report an issue in your area and we'll get it to the right department.</p>
          </div>
        )}

        {(isLoading || tickets.length > 0) && (
          <Shimmer loading={isLoading}>
            <Table className={cn('transition-opacity', isFetching && !isLoading && 'opacity-60')}>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Filed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isLoading
                  ? [
                      { id: 's1', title: 'Sample complaint title', category: { name: 'Category' }, status: 'OPEN' as TicketStatus, createdAt: new Date().toISOString() },
                      { id: 's2', title: 'Sample complaint title', category: { name: 'Category' }, status: 'OPEN' as TicketStatus, createdAt: new Date().toISOString() },
                    ]
                  : tickets
                ).map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                    <TableCell className="font-medium text-foreground">{ticket.title}</TableCell>
                    <TableCell className="text-muted-foreground">{ticket.category.name}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[ticket.status]}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{dateFormatter.format(new Date(ticket.createdAt))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Shimmer>
        )}

        {hasNextPage && <div ref={markerRef} className="h-1" />}
      </div>
    </section>
  )
}
