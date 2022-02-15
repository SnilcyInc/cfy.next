import type { NextApiRequest, NextApiResponse } from 'next'
import useSWR from 'swr'

export interface IApiData {
  url: string
  body: any
  response: any
}

export type IApiHandler<T extends IApiData> = (
  req: Omit<NextApiRequest, 'body'> & {
    body: T['body']
  },
  res: NextApiResponse<T['response']>
) => any

export const createApiHandler =
  <T extends IApiData>(handler: IApiHandler<T>) =>
  (req: NextApiRequest, res: NextApiResponse<T['response']>) => {
    req.body = JSON.parse(req.body)
    return handler(req, res)
  }

export const useApi = <T extends IApiData>(
  url: T['url'],
  body: T['body']
): {
  data: T['response']
  isLoading: boolean
  error: any
} => {
  const { data, error } = useSWR({ url, args: body })

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
