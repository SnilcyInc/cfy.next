import { IApiData } from '@/services/api/types'
import useSWR from 'swr'

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
