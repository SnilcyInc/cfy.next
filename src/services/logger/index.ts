import { AnyObject } from '@/utils/types'

const Types = {
  debug: 'D',
  info: 'I',
  warn: 'W',
  error: 'E',
}

type ILevel = keyof typeof Types

const formatData = (data: any): string => {
  // return String(data)
  return data
}

const print = (...args: any[]) => {
  console.log(...args)
}

export const createLogger = (namespace: string) => {
  return Object.keys(Types).reduce(
    (result, key) => ({
      ...result,
      [key]: (message: string, data: any) =>
        print({
          level: Types[key as ILevel],
          timestamp: Date.now(),
          namespace,
          message,
          data: formatData(data),
        }),
    }),
    {} as {
      [key in ILevel]: (message: string, data: any) => void
    }
  )
}
