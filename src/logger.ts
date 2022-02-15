import winston from 'winston'
import path from 'path'

const { combine, timestamp, printf } = winston.format

const Types = {
  debug: 'D',
  error: 'E',
  warn: 'W',
  info: 'I',
}

type ILevel = keyof typeof Types

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'MM.DD HH:mm:ss',
    }),
    printf(
      ({
        namespace,
        level,
        message,
        timestamp: time,
        type = '',
      }: winston.Logform.TransformableInfo) =>
        `${Types[level as ILevel]} ${time} ${namespace}:${type} => ${message}`
    )
  ),
  defaultMeta: { namespace: 'app' },
  transports: [
    new winston.transports.File({
      filename: path.resolve(process.cwd(), 'logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.resolve(process.cwd(), 'logs/combined.log'),
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.configure({
    level: 'debug',
  })
  logger.add(new winston.transports.Console())
}

const dbLogger = logger.child({ namespace: 'db' })
const coreLogger = logger.child({ namespace: 'core' })
const pagesLogger = (pageName: string) =>
  logger.child({ namespace: 'pages:' + pageName })
const apiLogger = logger.child({ namespace: 'api' })

const getLogger =
  (instance: winston.Logger) =>
  (level: ILevel, type: string, message: any = '') => {
    const isError = message instanceof Error
    const isString = typeof message === 'string'

    return instance.log({
      level,
      message:
        (isString && message) ||
        (isError && message.toString() + message.stack) ||
        JSON.stringify(message),
      type,
    })
  }

const loggers = {
  db: getLogger(dbLogger),
  core: getLogger(coreLogger),
  pages: (pageName: string) => getLogger(pagesLogger(pageName)),
  api: getLogger(apiLogger),
}

export default loggers
