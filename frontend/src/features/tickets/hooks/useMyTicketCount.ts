import { useQuery } from '@tanstack/react-query'
import { getMyTicketCountRequest } from '@/features/tickets/api/ticketsApi'
import type { TicketStatus } from '@/features/tickets/api/ticketsApi'

export function useMyTicketCount(status?: TicketStatus) {
  return useQuery({
    queryKey: ['tickets', 'count', status],
    queryFn: () => getMyTicketCountRequest(status),
    select: (response) => response.data.count,
  })
}
