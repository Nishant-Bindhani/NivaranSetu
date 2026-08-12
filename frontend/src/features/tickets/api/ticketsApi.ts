import { api, type ApiSuccess } from '@/shared/lib/axios'

export type Category = { id: string; name: string }
// matches backend/prisma/schema.prisma's TicketStatus enum — frontend can't
// import the backend's generated Prisma types directly, so this has to be
// kept in sync by hand if the schema's enum ever changes.
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

export type ListTicketsFilters = { search?: string; status?: TicketStatus; category?: string }
export type ListTicketsResult = { tickets: Ticket[]; nextCursor: string | null }

export async function listMyTicketsRequest(filters: ListTicketsFilters, cursor?: string) {
  const response = await api.get<ApiSuccess<ListTicketsResult>>('/v1/tickets', {
    params: { limit: 10, cursor, ...filters },
  })
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
