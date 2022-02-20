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
      serializePrepeare(data)
    )
  }

  constructor() {
    console.log('DBService constructor')
  }
}

export const dbService = new DBService()
