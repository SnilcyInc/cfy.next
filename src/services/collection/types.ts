export type INormalizeEntitieName = string
export type INormalizeEntitieId = string

export type INormalizeEntitieFrom = {
  id: INormalizeEntitieId
}

export type INormalizeEntitieTo = INormalizeEntitieFrom & {
  entitie: INormalizeEntitieName
}

export type INormalizeCollectionData<T extends INormalizeEntitieFrom> = {
  [key: INormalizeEntitieName]: {
    [key: INormalizeEntitieId]: INormalizeEntitieTo & T
  }
}

export type INormalizeCollection<T extends INormalizeEntitieFrom> = {
  collections: INormalizeCollectionData<T>
}

export type INormalizeResult = INormalizeEntitieId[]

export type INormalizeData<T extends INormalizeEntitieFrom> = {
  collections: INormalizeCollectionData<T>
  result: INormalizeResult
  error?: any
}

export type INormalizeEmptyEntitie = { id: string }

export type INormalizeDataWithEmpty<T extends INormalizeEntitieFrom> =
  | INormalizeData<INormalizeEmptyEntitie>
  | INormalizeData<T>
