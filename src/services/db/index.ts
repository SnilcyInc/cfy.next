import prisma from '@/prisma'
import { AnyObject } from '@/utils/types'
import { normalizeDataToCollection } from '@/services/normalizer'

export class DBService {
  protected db = prisma
  private normalizeDbData = normalizeDataToCollection

  constructor() {
    console.log('DBService constructor')
  }

  protected prepareDbData<T>(data: AnyObject) {
    console.log('data before', data)

    for (const key in data) {
      const value = data[key]

      // date to string
      if (value instanceof Date) {
        data[key] = Number(value)
      }
    }

    console.log('data after', data)

    return data as T
  }
}

export const dbService = new DBService()
