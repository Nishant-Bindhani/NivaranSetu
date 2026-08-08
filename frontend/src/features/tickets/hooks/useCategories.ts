import { useQuery } from '@tanstack/react-query'
import { listCategoriesRequest } from '@/features/tickets/api/ticketsApi'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: listCategoriesRequest,
    select: (response) => response.data,
  })
}
