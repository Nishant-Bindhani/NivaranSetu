import { readFileSync } from 'fs'
import { prisma } from '../src/config/database.js'

// Runs a .sql file's statements directly against the real database,
// outside the normal `prisma migrate dev` flow — for SQL Prisma has no
// typed method for (e.g. RLS: ENABLE ROW LEVEL SECURITY, CREATE POLICY).
// Usage: npx tsx --env-file=.env scripts/apply-raw-sql.ts path/to/file.sql
const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: apply-raw-sql.ts <path-to-sql-file>')
  process.exit(1)
}

async function main() {
  const sql = readFileSync(filePath, 'utf-8')
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement)
  }

  console.log(`Applied ${statements.length} statement(s) from ${filePath}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
