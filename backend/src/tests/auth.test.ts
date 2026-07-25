import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@config/app.js'
import { prisma } from '@config/database.js'

const email = `test-${Date.now()}@example.com`
const password = 'correct-horse-battery-staple'

describe('auth', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email,
      password,
      name: 'Test User',
    })

    expect(res.status).toBe(201)
    expect(res.body.data.email).toBe(email)
  })

  it('rejects login before email is verified', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email, password })

    expect(res.status).toBe(403)
  })

  it('records the failed login attempt in login_history', async () => {
    const attempt = await prisma.loginHistory.findFirst({
      where: { emailAttempted: email },
      orderBy: { createdAt: 'desc' },
    })

    expect(attempt).not.toBeNull()
    expect(attempt?.status).toBe('FAILED')
  })
})
