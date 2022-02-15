import { PrismaClient, Prisma } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

declare global {
  var prisma: PrismaClient
}

// declare var NEW_GLOBAL: string

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient()
  }
  prisma = globalThis.prisma
}

export default prisma

export type IDBUser = Prisma.UserGetPayload<{}>
export type IDBLink = Prisma.LinkGetPayload<{}>
