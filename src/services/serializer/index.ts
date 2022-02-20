import { AnyObject } from '@/utils/types'

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
  console.log('stringify', typeof data, data)

  try {
    return JSON.stringify(data, replacer)
  } catch (err) {
    console.error('stringify', err, data)
  }
}

export const parse = (data: any) => {
  console.log('parse', typeof data, data)
  if (typeof data === 'object') return data

  try {
    return JSON.parse(data)
  } catch (err) {
    console.error('parse', err, data)
  }
}
