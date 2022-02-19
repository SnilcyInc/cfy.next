import {
  IDbApiAllowedEntitiesBody,
  IDbApiData,
  IDbApiUrl,
} from '@/services/db/types'
import { useApi } from '@/services/api/hook'

export const useDB = <
  IResult extends IDbApiAllowedEntitiesBody = IDbApiAllowedEntitiesBody
>(
  entitie: IDbApiData['body']['entitie'],
  where: IDbApiData['body']['where']
) => useApi<IDbApiData<IResult>>(IDbApiUrl, { entitie, where })
