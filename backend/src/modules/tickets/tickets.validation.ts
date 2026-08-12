import { z } from 'zod'
import { TicketStatus } from '@generated/prisma/enums.js'

export const createTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  categoryId: z.string().min(1),
})

export const listTicketsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  status: z.enum(TicketStatus).optional(),
  category: z.string().min(1).optional(),
})

export type ListTicketsQuery = z.infer<typeof listTicketsQuerySchema>

export const countTicketsQuerySchema = z.object({
  status: z.enum(TicketStatus).optional(),
})

export type CountTicketsQuery = z.infer<typeof countTicketsQuerySchema>
