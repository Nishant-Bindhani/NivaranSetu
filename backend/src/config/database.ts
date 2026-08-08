import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'
import { config } from '@config/env.js'

const globalForPrisma = global as unknown as { prisma: PrismaClient; scopedPrisma: PrismaClient }

const logLevels: ('query' | 'error' | 'warn')[] =
  config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']

// Owner role (has BYPASSRLS) — migrations/seeding only. The running app
// must not query through this, or RLS policies are silently never enforced.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: config.DATABASE_URL }),
    log: logLevels,
  })

// Restricted role (no BYPASSRLS) — every real app query goes through this,
// so Postgres actually applies RLS policies instead of skipping them.
export const scopedPrisma =
  globalForPrisma.scopedPrisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: config.APP_DATABASE_URL }),
    log: logLevels,
  })

if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.scopedPrisma = scopedPrisma
}
