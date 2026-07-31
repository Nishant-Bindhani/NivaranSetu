import { Router } from 'express'
import { getMe } from './users.controller.js'
import { requireAuth } from '@middleware/authenticate.middleware.js'

const router = Router()

router.get('/me', requireAuth, getMe)

export default router
