import prisma from '@/prisma'
import {
  normalizeObjectToCollection,
  normalizeArrayToCollection,
} from '@/services/collection'
import { INormalizeEntitieFrom } from '@/services/collection/types'
import { serializePrepeare } from '@/services/serializer'
import { log } from './logger'

const DB_ENTITIES = {
  link: prisma.link,
  user: prisma.user,
}

export type IDBEntitieNames = keyof typeof DB_ENTITIES

export abstract class DBService<
  N extends IDBEntitieNames,
  E extends INormalizeEntitieFrom
> {
  entitieName: N
  db: typeof DB_ENTITIES[N]

  constructor(entitieName: N) {
    log.debug('DBService constructor', entitieName)

    this.entitieName = entitieName
    this.db = DB_ENTITIES[entitieName]
  }

  protected normalize(data: E | E[]) {
    if (Array.isArray(data)) {
      return normalizeArrayToCollection<E>(
        this.entitieName,
        data.map<E>(serializePrepeare)
      )
    }

    return normalizeObjectToCollection<E>(
      this.entitieName,
      serializePrepeare(data)
    )
  }
}
