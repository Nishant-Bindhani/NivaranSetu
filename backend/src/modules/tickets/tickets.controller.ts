import type { Request, Response } from 'express'
import {
  createTicket,
  listMyTickets,
  getTicketById,
  listCategories,
} from './tickets.service.js'
import type { ListTicketsQuery } from './tickets.validation.js'
import { successResponse } from '@utils/apiResponse.js'
import { AppError } from '@utils/AppError.js'

export async function createTicketHandler(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authenticated', 401)
  res.status(201).json(successResponse(await createTicket(req.body, req.user), 'Complaint filed successfully'))
}

export async function listMyTicketsHandler(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authenticated', 401)
  const filters = req.validatedQuery as ListTicketsQuery
  res.status(200).json(successResponse(await listMyTickets(filters, req.user), 'Your complaints'))
}

export async function getTicketByIdHandler(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authenticated', 401)
  res.status(200).json(successResponse(await getTicketById(String(req.params.id), req.user), 'Complaint detail'))
}

export async function listCategoriesHandler(_req: Request, res: Response) {
  res.status(200).json(successResponse(await listCategories(), 'Categories'))
}
