import { prisma } from '@config/database.js'
import { Prisma } from '../../generated/prisma/client.js'
import type { AccessTokenPayload } from '@utils/jwt.js'

// Runs `query` inside a DB transaction, after telling Postgres who the
// current user is (via SET LOCAL). RLS policies on the tickets table read
// these values to decide which rows this user is even allowed to see.
async function withUserScope<T>(
  user: AccessTokenPayload,
  query: (db: Prisma.TransactionClient) => Promise<T>,
) {
  return prisma.$transaction(async (db) => {
    await db.$executeRaw`SET LOCAL app.current_user_id = ${user.userId}`
    await db.$executeRaw`SET LOCAL app.current_user_role = ${user.role}`
    await db.$executeRaw`SET LOCAL app.current_dept_id = ${user.deptId ?? ''}`
    await db.$executeRaw`SET LOCAL app.current_org_id = ${user.orgId ?? ''}`
    return query(db)
  })
}

export function createTicket(
  data: { title: string; description: string; categoryId: string; userId: string },
  user: AccessTokenPayload,
) {
  return withUserScope(user, (db) => db.ticket.create({ data }))
}

export function findTicketsForUser(user: AccessTokenPayload) {
  return withUserScope(user, (db) =>
    db.ticket.findMany({ orderBy: { createdAt: 'desc' }, include: { category: true } }),
  )
}

export function findTicketByIdForUser(id: string, user: AccessTokenPayload) {
  return withUserScope(user, (db) =>
    db.ticket.findUnique({ where: { id }, include: { category: true } }),
  )
}

export function findCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } })
}

export function listActiveCategories() {
  return prisma.category.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } })
}
