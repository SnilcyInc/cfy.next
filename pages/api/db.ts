import prisma from '@/prisma'
import logger from '@/logger'
import { createApiHandler } from '@/services/api/handler'
import { IDbApiData } from '@/services/db/types'

export default createApiHandler<IDbApiData>(async (req, res) => {
  // const links = await prisma.link.findMany({
  //   skip: req.body.page,
  //   take: req.body.limit,
  // })

  return res.status(404).json({
    error: 'not found',
  })
})
