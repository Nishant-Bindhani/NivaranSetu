import { useQuery } from '@tanstack/react-query'
import { getTicketRequest } from '@/features/tickets/api/ticketsApi'

export function useTicket(id: string) {
  return useQuery({
    queryKey: ['tickets', id],
    queryFn: () => getTicketRequest(id),
    select: (response) => response.data,
  })
}
