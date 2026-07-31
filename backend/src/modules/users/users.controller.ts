import type { Request, Response } from 'express'
import { findUserById } from '@modules/auth/auth.repository.js'
import { AppError } from '@utils/AppError.js'

export async function getMe(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError('Not authenticated', 401)
  }

  const user = await findUserById(req.user.userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
}
