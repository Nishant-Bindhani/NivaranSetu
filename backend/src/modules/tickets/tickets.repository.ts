import { scopedPrisma } from '@config/database.js'
import { Prisma } from '@generated/prisma/client.js'
import type { TicketStatus } from '@generated/prisma/enums.js'
import type { AccessTokenPayload } from '@utils/jwt.js'
import { decodeCursor, encodeCursor } from '@utils/cursor.js'
import type { ListTicketsQuery } from './tickets.validation.js'

// Runs `query` inside a DB transaction, after telling Postgres who the
// current user is (via SET LOCAL). RLS policies on the tickets table read
// these values to decide which rows this user is even allowed to see.
async function withUserScope<T>(
  user: AccessTokenPayload,
  query: (db: Prisma.TransactionClient) => Promise<T>,
) {
  return scopedPrisma.$transaction(async (db) => {
    // SET LOCAL itself can't take a bind parameter for the value — only
    // set_config() (a real function call) can, so that's used instead.
    await db.$executeRaw`SELECT set_config('app.current_user_id', ${user.userId}, true)`
    await db.$executeRaw`SELECT set_config('app.current_user_role', ${user.role}, true)`
    await db.$executeRaw`SELECT set_config('app.current_dept_id', ${user.deptId ?? ''}, true)`
    await db.$executeRaw`SELECT set_config('app.current_org_id', ${user.orgId ?? ''}, true)`
    return query(db)
  })
}

export function createTicket(
  data: { title: string; description: string; categoryId: string; userId: string },
  user: AccessTokenPayload,
) {
  return withUserScope(user, (db) => db.ticket.create({ data }))
}

export function findTicketsForUser(filters: ListTicketsQuery, user: AccessTokenPayload) {
  return withUserScope(user, async (db) => {
    const { limit, cursor, search, status, category } = filters
    const cursorPosition = cursor ? decodeCursor(cursor) : null

    const where: Prisma.TicketWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        status ? { status } : {},
        category ? { category: { name: category } } : {},
        cursorPosition
          ? {
              OR: [
                { createdAt: { lt: new Date(cursorPosition.createdAt) } },
                { createdAt: new Date(cursorPosition.createdAt), id: { lt: cursorPosition.id } },
              ],
            }
          : {},
      ],
    }

    const rows = await db.ticket.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      include: { category: true },
    })

    const hasMore = rows.length > limit
    const tickets = hasMore ? rows.slice(0, limit) : rows
    const last = tickets.at(-1)
    const nextCursor = hasMore && last ? encodeCursor({ id: last.id, createdAt: last.createdAt.toISOString() }) : null

    return { tickets, nextCursor }
  })
}

export function countTicketsForUser(status: TicketStatus | undefined, user: AccessTokenPayload) {
  return withUserScope(user, (db) => db.ticket.count({ where: status ? { status } : {} }))
}

export function findTicketByIdForUser(id: string, user: AccessTokenPayload) {
  return withUserScope(user, (db) =>
    db.ticket.findUnique({ where: { id }, include: { category: true } }),
  )
}

export function findCategoryById(id: string) {
  return scopedPrisma.category.findUnique({ where: { id } })
}

export function listActiveCategories() {
  return scopedPrisma.category.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } })
}
