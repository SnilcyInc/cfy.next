import type { NextApiRequest, NextApiResponse } from 'next'
import { IApiData } from '@/services/api/types'
import logger from '@/logger'

export type IApiHandler<T extends IApiData> = (
  req: Omit<NextApiRequest, 'body'> & {
    body: T['body']
  },
  res: NextApiResponse<T['response']>
) => any

export const createApiHandler =
  <T extends IApiData>(handler: IApiHandler<T>) =>
  (req: NextApiRequest, res: NextApiResponse<T['response']>) => {
    logger.api('debug', 'createApiHandler', {
      body: req.body,
      coockies: req.cookies,
      query: req.query,
    })

    const body = req.body

    if (body && typeof body === 'string') {
      try {
        req.body = JSON.parse(req.body)
      } catch (err) {
        logger.api('error', 'createApiHandler', err)
      }
    }

    return handler(req, res)
  }
