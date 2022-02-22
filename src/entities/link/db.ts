import { DBService } from '@/services/db'
import { IEntitieLink, IEntitieLinkId } from './types'
import {
  EMPTY_COLLECTION,
  INormalizeDataWithEmpty,
} from '@/services/collection'

class LinkDBService extends DBService<'link', IEntitieLink> {
  async getLinkById(
    id: IEntitieLinkId
  ): Promise<INormalizeDataWithEmpty<IEntitieLink>> {
    const link = await this.db.findFirst({
      where: { id },
    })

    if (!link) return EMPTY_COLLECTION

    return this.normalize(link)
  }

  async getLinks(take?: number) {
    const links = await this.db.findMany({ take })
    return this.normalize(links)
  }
}

export const linkDB = new LinkDBService('link')
