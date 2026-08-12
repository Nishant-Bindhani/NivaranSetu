import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'
import { listMyTicketsRequest, type ListTicketsFilters } from '@/features/tickets/api/ticketsApi'

export function useMyTickets(filters: ListTicketsFilters) {
  return useInfiniteQuery({
    queryKey: ['tickets', filters],
    queryFn: ({ pageParam }) => listMyTicketsRequest(filters, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
    // keep showing the PREVIOUS filter's results while a new filter's
    // request is in flight, instead of flashing to isLoading/empty —
    // isLoading is only true on the very first fetch ever, from here on
    placeholderData: keepPreviousData,
  })
}
