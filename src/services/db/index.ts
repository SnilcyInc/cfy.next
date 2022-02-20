import prisma from '@/prisma'
import {
  normalizeObjectToCollection,
  normalizeArrayToCollection,
} from '@/services/collection'
import { INormalizeEntitieFrom } from '@/services/collection/types'
import { serializePrepeare } from '@/services/serializer'

export interface IDBService {
  entitieName: string
}

export class DBService<T extends INormalizeEntitieFrom> implements IDBService {
  protected db = prisma
  entitieName = 'abstract'

  protected normalize(data: T | T[]) {
    if (Array.isArray(data)) {
      return normalizeArrayToCollection<T>(
        this.entitieName,
        data.map<T>(serializePrepeare)
      )
    }

    return normalizeObjectToCollection<T>(
      this.entitieName,
      // serializePrepeare(data)
      serializePrepeare(data)
    )
  }

  constructor() {
    console.log('DBService constructor')
  }

  // private prepareDbData<T>(data: AnyObject) {
  //   console.log('data before', data)

  //   for (const key in data) {
  //     const value = data[key]

  //     // date to string
  //     if (value instanceof Date) {
  //       data[key] = `${DATE_PREFIX}${Number(value)}`
  //     }
  //   }

  //   console.log('data after', data)

  //   return data as T
  // }
}

export const dbService = new DBService()
