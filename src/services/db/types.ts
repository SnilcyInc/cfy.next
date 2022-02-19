import { IApiData } from '@/services/api/types'
import { IEntitieLink } from '@/entities/link'
import { IEntitieUser } from '@/entities/user'

export const IDbApiUrl: '/api/db' = '/api/db'

export type IDbApiAllowedEntities = {
  user: IEntitieUser
  link: IEntitieLink
}

type IDbApiAllowedEntitiesKeys =
  IDbApiAllowedEntities[keyof IDbApiAllowedEntities]

export interface IDbApiData<
  IDbResponse extends IDbApiAllowedEntitiesKeys = IDbApiAllowedEntitiesKeys
> extends IApiData {
  url: typeof IDbApiUrl
  body: {
    entitie: keyof IDbApiAllowedEntities
    where: { id: string | string[] }
    page?: number
    limit?: number
  }
  response: {
    error?: string
    data?: IDbResponse
  }
}

export type IDbApiAllowedEntitiesBody =
  IDbApiAllowedEntities[IDbApiData['body']['entitie']]
