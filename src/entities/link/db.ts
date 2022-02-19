import { DBService } from '@/services/db'
import { IEntitieLink, IEntitieLinkId } from './types'

class LinkDBService extends DBService {
  async getLinkById(id: IEntitieLinkId) {
    const link = await this.db.link.findFirst({
      where: { id },
    })

    if (!link) return
    return this.preparePrismaData<IEntitieLink>(link)
  }

  async getRandomLinks(take: number) {
    const links = await this.db.link.findMany({ take })
    return links.map<IEntitieLink>(this.preparePrismaData)
  }
}

export const linkDB = new LinkDBService()
