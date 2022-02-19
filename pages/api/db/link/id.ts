import { createApiHandler } from '@/services/api/handler'
import { IDbApiData } from '@/services/db/types'
import { IEntitieLink } from '@/entities/link'
import { linkDB } from '@/entities/link/db'

export default createApiHandler<IDbApiData<IEntitieLink>>(async (req, res) => {
  const link = await linkDB.getLinkById(req.body.id)

  console.log(link)

  if (link) {
    return res.json({
      collection: {
        link: { [link.id]: link },
      },
      result: [link.id],
    })
  }

  return res.status(404).json({
    error: 'not found',
  })
})
