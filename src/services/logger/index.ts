const Types = {
  debug: 'D',
  info: 'I',
  warn: 'W',
  error: 'E',
}

const TypesEmoji: {
  [key: string]: string
} = {
  D: '⚙️️',
  I: '❕',
  W: '⚠️',
  E: '❌',
}

type ILevel = keyof typeof Types

type ILoggerParams = {
  level: string
  timestamp: number
  namespace: string
  message: string
  data: any
}

const formatData = (data: any): string => {
  // return String(data)
  return data
}

const print = ({ level, namespace, message, data }: ILoggerParams) => {
  // console.log(...args)
  console.log([TypesEmoji[level] + ' ', namespace, message].join(' '), data)
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
