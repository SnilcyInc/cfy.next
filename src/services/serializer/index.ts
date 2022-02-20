import { AnyObject } from '@/utils/types'
import { log } from '@/services/serializer/logger'

const replacer = (_: string, value: any) => {
  if (value instanceof Date) {
    return value.toJSON()
  }

  return value
}

export const serializePrepeare = <T>(obj: AnyObject) =>
  Object.entries(obj).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: replacer(key, value),
    }),
    {} as AnyObject
  ) as T

export const stringify = (data: any) => {
  log.debug('stringify', data)

  try {
    return JSON.stringify(data, replacer)
  } catch (err) {
    log.error('stringify', {
      err,
      data,
    })
  }
}

export const parse = (data: any) => {
  log.debug('parse', data)
  if (typeof data === 'object') return data

  try {
    return JSON.parse(data)
  } catch (err) {
    log.error('parse', {
      err,
      data,
    })
  }
}
