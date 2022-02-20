import { DBService, IDBService } from '@/services/db'
import { IEntitieLink, IEntitieLinkId } from './types'

class LinkDBService extends DBService<IEntitieLink> {
  entitieName = 'link' as const

  async getLinkById(id: IEntitieLinkId) {
    const link = await this.db.link.findFirst({
      where: { id },
    })

    if (!link) return

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
