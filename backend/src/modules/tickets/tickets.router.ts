import { Router } from 'express'
import {
  createTicketHandler,
  listMyTicketsHandler,
  getTicketByIdHandler,
  listCategoriesHandler,
} from './tickets.controller.js'
import { validate, validateQuery } from '@middleware/validate.middleware.js'
import { requireAuth } from '@middleware/authenticate.middleware.js'
import { createTicketSchema, listTicketsQuerySchema } from './tickets.validation.js'

const router = Router()

router.use(requireAuth)
router.post('/', validate(createTicketSchema), createTicketHandler)
router.get('/', validateQuery(listTicketsQuerySchema), listMyTicketsHandler)
router.get('/categories', listCategoriesHandler)
router.get('/:id', getTicketByIdHandler)

export default router
