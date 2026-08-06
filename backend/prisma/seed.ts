import { prisma } from '../src/config/database.js'

const CATEGORY_NAMES = ['Roads', 'Water Supply', 'Electricity', 'Sanitation', 'Other']

async function main() {
  for (const name of CATEGORY_NAMES) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
  console.log(`Seeded ${CATEGORY_NAMES.length} categories`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
