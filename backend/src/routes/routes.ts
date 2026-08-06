import { Router } from 'express'
import authRouter from '@modules/auth/auth.router.js'
import usersRouter from '@modules/users/users.router.js'
import ticketsRouter from '@modules/tickets/tickets.router.js'

const routes = Router()

routes.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

routes.use('/v1/auth', authRouter)
routes.use('/v1/users', usersRouter)
routes.use('/v1/tickets', ticketsRouter)

export default routes
