import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createTicketRequest } from '@/features/tickets/api/ticketsApi'

export function useCreateTicket() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createTicketRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      navigate(`/tickets/${response.data.id}`, { state: { justCreated: true } })
    },
  })
}
