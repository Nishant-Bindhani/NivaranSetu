import { AppError } from '@utils/AppError.js'
import { ROLE } from '@utils/roles.js'
import type { AccessTokenPayload } from '@utils/jwt.js'
import {
  createTicket as createTicketRow,
  findTicketsForUser,
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

export async function listMyTickets(user: AccessTokenPayload) {
  return findTicketsForUser(user)
}

export async function getTicketById(id: string, user: AccessTokenPayload) {
  const ticket = await findTicketByIdForUser(id, user)
  if (!ticket || (user.role === ROLE.CITIZEN && ticket.userId !== user.userId)) {
    throw new AppError('Ticket not found', 404)
  }
  return ticket
}

export async function listCategories() {
  return listActiveCategories()
}
