import { PrismaClient } from '@prisma/client'
import { links } from './data'
const prisma = new PrismaClient()

async function main() {
  await prisma.link.deleteMany()
  await prisma.link.createMany({
    data: links,
  })

  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      email: `admin@gmail.com`,
      role: 'ADMIN',
      bookmarks: {
        connect: {
          id: links[0].id,
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      email: `user@gmail.com`,
      role: 'USER',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
