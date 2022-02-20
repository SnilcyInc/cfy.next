import { GetStaticProps } from 'next'
import Image from 'next/image'
import logger from '@/logger'
import { useDB } from '@/services/db/hook'
import { IEntitieLink } from '@/entities/link'
import { linkDB } from '@/entities/link'

const DEFAULT_LINKS_COUNT = 2

const log = logger.pages('Links')

function Link({ link }: { link: IEntitieLink }) {
  const { url, imageUrl, title, description, category, id } = link

  // const resp = useDB('link', { id })
  const { data } = useDB<IEntitieLink>('link', { id })
  console.log(data)

  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        <h3>{title}</h3>
      </a>
      <p>{description}</p>
      <Image src={imageUrl} alt={title} width="300" height="150" />
      <div>
        <span>{category}</span>
      </div>
    </div>
  )
}

export default function Links({ links = [] }: { links: IEntitieLink[] }) {
  return (
    <section>
      <h2>Links</h2>
      {links.map((link) => (
        <Link link={link} key={link.id} />
      ))}
      <button type="button" onClick={() => {}}>
        Load more
      </button>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { collections, result } = await linkDB.getRandomLinks(2)
  const links = result.map((id) => collections.link[id])

  log('debug', 'getStaticProps', links)

  return {
    props: {
      links,
    },
  }
}
