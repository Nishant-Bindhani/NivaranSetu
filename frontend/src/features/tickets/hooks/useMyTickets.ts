import { useInfiniteQuery } from '@tanstack/react-query'
import { listMyTicketsRequest, type ListTicketsFilters } from '@/features/tickets/api/ticketsApi'

export function useMyTickets(filters: ListTicketsFilters) {
  return useInfiniteQuery({
    queryKey: ['tickets', filters],
    queryFn: ({ pageParam }) => listMyTicketsRequest(filters, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
  })
}
