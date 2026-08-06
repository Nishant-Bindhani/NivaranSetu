import { z } from 'zod'

export const createTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  categoryId: z.string().min(1),
})
