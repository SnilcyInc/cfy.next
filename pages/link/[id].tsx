import { GetStaticProps, GetStaticPaths } from 'next'
import { IEntitieLink } from '@/entities/link'
import { linkDB } from '@/entities/link'
import { createPageLogger } from '@/services/pages/logger'

const log = createPageLogger('Link')

export default function Link(props: { link: IEntitieLink }) {
  log.debug('Link', props)
  const { link } = props

  if (!link) return <div>not found</div>

  return (
    <div>
      Link: this is id: {link.id}, title: {link.title}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (args) => {
  log.debug('getStaticProps', args)
  const id = args?.params?.id

  if (id && typeof id === 'string') {
    const { collections, result } = await linkDB.getLinkById(id)
    const link = collections.link[result[0]]

    log.debug('getStaticProps resutl', link)
    return {
      props: {
        link,
      },
    }
  }

  return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await linkDB.getLinks()
  const paths = data.result.map((id) => ({ params: { id } }))

  log.debug('getStaticPaths', paths)

  return {
    paths,
    fallback: true,
  }
}
