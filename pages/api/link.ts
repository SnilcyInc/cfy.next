import type { NextApiRequest, NextApiResponse } from 'next'
import prisma, { IDBLink } from '@/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDBLink>
) {
  const id = req.query.id
  if (Array.isArray(id)) {
    return res.status(404)
  }

  const link = await prisma.link.findUnique({
    where: {
      id: req.query.id as string,
    },
  })

  if (link === null) {
    return res.status(404)
  }

  res.status(200).json(link)
}
