import type { NextApiRequest, NextApiResponse } from 'next'
import { IApiData } from '@/services/api/types'
import { parse } from '@/services/serializer'
import { log } from '@/services/api/logger'

type IApiReq<T extends IApiData> = Omit<NextApiRequest, 'body'> & {
  body: T['body']
}

type IApiRes<T extends IApiData> = NextApiResponse<T['response']>

export type IApiHandler<T extends IApiData> = (
  req: IApiReq<T>,
  res: IApiRes<T>
) => any

export const createApiHandler =
  <T extends IApiData>(handler: IApiHandler<T>) =>
  (req: NextApiRequest, res: NextApiResponse<T['response']>) => {
    log.debug('ApiHandler', {
      body: req.body,
      coockies: req.cookies,
      query: req.query,
    })

    req.body = parse(req.body)

    return handler(req, res)
  }
