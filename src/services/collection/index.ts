import {
  INormalizeData,
  INormalizeEntitieFrom,
  INormalizeEntitieName,
} from './types'

export const normalizeObjectToCollection = <T extends INormalizeEntitieFrom>(
  entitieName: INormalizeEntitieName,
  data: T
): INormalizeData<T> => ({
  collections: {
    [entitieName]: {
      [data.id]: {
        ...data,
        entitie: entitieName,
      },
    },
  },
  result: [data.id],
})

export const normalizeArrayToCollection = <T extends INormalizeEntitieFrom>(
  entitieName: INormalizeEntitieName,
  data: T[]
): INormalizeData<T> =>
  data.reduce(
    ({ collections, result }: INormalizeData<T>, item) => ({
      collections: {
        [entitieName]: {
          ...collections[entitieName],
          [item.id]: {
            ...item,
            entitie: entitieName,
          },
        },
      },
      result: [...result, item.id],
    }),
    {
      collections: {
        [entitieName]: {},
      },
      result: [],
    } as INormalizeData<T>
  )
