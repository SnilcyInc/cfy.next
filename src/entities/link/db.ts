import { DBService } from '@/services/db'
import { IEntitieLink, IEntitieLinkId } from './types'
import {
  EMPTY_COLLECTION,
  INormalizeDataWithEmpty,
} from '@/services/collection'

class LinkDBService extends DBService<IEntitieLink> {
  entitieName = 'link' as const

  async getLinkById(
    id: IEntitieLinkId
  ): Promise<INormalizeDataWithEmpty<IEntitieLink>> {
    const link = await this.db.link.findFirst({
      where: { id },
    })

    if (!link) return EMPTY_COLLECTION

    return this.normalize(link)
  }

  async getRandomLinks(take: number) {
    const links = await this.db.link.findMany({ take })
    return this.normalize(links)
  }

  async getAllLinks() {
    const links = await this.db.link.findMany()
    return this.normalize(links)
  }
}

export const linkDB = new LinkDBService()
