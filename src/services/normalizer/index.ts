import {
  INormalizeEntitieName,
  INormalizeEntitieId,
  INormalizeEntitieFrom,
  INormalizeCollection,
} from './types'

export const normalizeDataToCollection = (
  entitieName: INormalizeEntitieName,
  data: INormalizeEntitieFrom
): INormalizeCollection => {
  return {
    collections: {
      [entitieName]: {
        [data.id]: {
          ...data,
          entitie: entitieName,
        },
      },
    },
  }
}
