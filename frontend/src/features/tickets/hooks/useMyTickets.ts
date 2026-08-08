import { useQuery } from '@tanstack/react-query'
import { listMyTicketsRequest } from '@/features/tickets/api/ticketsApi'

export function useMyTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: listMyTicketsRequest,
    select: (response) => response.data,
  })
}
