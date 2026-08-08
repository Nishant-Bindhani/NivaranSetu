import { api, type ApiSuccess } from '@/shared/lib/axios'

export type Category = { id: string; name: string }
export type TicketStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'ESCALATED' | 'RESOLVED' | 'CLOSED' | 'REOPENED'
export type Ticket = {
  id: string
  title: string
  description: string
  status: TicketStatus
  category: Category
  createdAt: string
}
export type CreateTicketInput = { title: string; description: string; categoryId: string }

export async function createTicketRequest(input: CreateTicketInput) {
  const response = await api.post<ApiSuccess<{ id: string }>>('/v1/tickets', input)
  return response.data
}

export async function listMyTicketsRequest() {
  const response = await api.get<ApiSuccess<Ticket[]>>('/v1/tickets')
  return response.data
}

export async function getTicketRequest(id: string) {
  const response = await api.get<ApiSuccess<Ticket>>(`/v1/tickets/${id}`)
  return response.data
}

export async function listCategoriesRequest() {
  const response = await api.get<ApiSuccess<Category[]>>('/v1/tickets/categories')
  return response.data
}
