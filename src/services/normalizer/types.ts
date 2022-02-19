export type INormalizeEntitieName = string
export type INormalizeEntitieId = string

export type INormalizeEntitieFrom = {
  id: INormalizeEntitieId
}

export type INormalizeEntitieTo = INormalizeEntitieFrom & {
  entitie: INormalizeEntitieName
}

export type INormalizeCollectionData = {
  [key: INormalizeEntitieName]: {
    [key: INormalizeEntitieId]: INormalizeEntitieTo
  }
}

export type INormalizeCollection = {
  collections: INormalizeCollectionData
}

export type INormalizeResult = INormalizeEntitieId[]

export type INormalizeData = {
  collections: INormalizeCollectionData
  result: INormalizeResult
  error: any
}
