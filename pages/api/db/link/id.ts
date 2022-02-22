import { createApiHandler } from '@/services/api/handler'
import { IDbApiData } from '@/services/db/types'
import { IEntitieLink } from '@/entities/link'
import { linkDB } from '@/entities/link/db'
import { log } from '@/services/db/logger'

export default createApiHandler<IDbApiData<IEntitieLink>>(async (req, res) => {
  const response = await linkDB.getLinkById(req.body.id)

  log.debug('link', response)

  if (response) {
    return res.json(response)
  }

  return res.status(404).json({
    error: 'not found',
  })
})
