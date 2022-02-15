import type { NextApiRequest, NextApiResponse } from 'next'
import prisma, { IDBLink } from '@/prisma'
import logger from '@/logger'
import { createApiHandler, IApiData } from '@/api'

export const IApiLinksUrl: '/api/links' = '/api/links'

export interface IApiLinksData extends IApiData {
  url: typeof IApiLinksUrl
  body: {
    page: number
    limit: number
  }
  response: IDBLink[]
}

export default createApiHandler<IApiLinksData>(async (req, res) => {
  logger.api('debug', 'req', {
    query: req.query,
    body: req.body,
    cookies: req.cookies,
  })

  const links = await prisma.link.findMany({
    skip: req.body.page,
    take: req.body.limit,
  })

  if (links.length) return res.json(links)

  return res.status(404)
})
