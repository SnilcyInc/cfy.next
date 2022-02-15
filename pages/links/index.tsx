import { GetStaticProps } from 'next'
import useSWR from 'swr'
import Image from 'next/image'
import prisma, { IDBLink } from '@/prisma'
import logger from '@/logger'
import { useApi } from '@/api'
import { IApiLinksData } from 'api/links'

const log = logger.pages('Links')

function Link({ link }: { link: IDBLink }) {
  const { url, imageUrl, title, description, category } = link

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

export default function Links({ links = [] }: { links: IDBLink[] }) {
  const { data, error, isLoading } = useApi<IApiLinksData>('/api/links', {
    page: 0,
    limit: 1,
  })

  console.log('Links', { data, error })

  if (isLoading) return 'loading'

  return (
    <section>
      <h2>Links</h2>
      {data.map((link) => (
        <Link link={link} key={link.id} />
      ))}
      <button type="button" onClick={() => {}}>
        Load more
      </button>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const links = (
    await prisma.link.findMany({
      take: 1,
    })
  ).map((item) => {
    return {
      ...item,
      createdAt: String(item.createdAt),
      updatedAt: String(item.updatedAt),
    }
  })

  log('debug', 'getStaticProps', links)

  return {
    props: {
      links,
    },
  }
}
