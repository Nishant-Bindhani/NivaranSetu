import { AppError } from '@utils/AppError.js'
import { Role } from '@generated/prisma/enums.js'
import type { TicketStatus } from '@generated/prisma/enums.js'
import type { AccessTokenPayload } from '@utils/jwt.js'
import type { ListTicketsQuery } from './tickets.validation.js'
import {
  createTicket as createTicketRow,
  findTicketsForUser,
  countTicketsForUser,
  findTicketByIdForUser,
  findCategoryById,
  listActiveCategories,
} from './tickets.repository.js'

export async function createTicket(
  input: { title: string; description: string; categoryId: string },
  user: AccessTokenPayload,
) {
  const category = await findCategoryById(input.categoryId)
  if (!category || !category.isActive) {
    throw new AppError('Invalid category', 400)
  }

  const ticket = await createTicketRow({ ...input, userId: user.userId }, user)
  return { id: ticket.id }
}

export async function listMyTickets(filters: ListTicketsQuery, user: AccessTokenPayload) {
  return findTicketsForUser(filters, user)
}

export async function countMyTickets(status: TicketStatus | undefined, user: AccessTokenPayload) {
  return countTicketsForUser(status, user)
}

export async function getTicketById(id: string, user: AccessTokenPayload) {
  const ticket = await findTicketByIdForUser(id, user)
  if (!ticket || (user.role === Role.CITIZEN && ticket.userId !== user.userId)) {
    throw new AppError('Ticket not found', 404)
  }
  return ticket
}

export async function listCategories() {
  return listActiveCategories()
}
