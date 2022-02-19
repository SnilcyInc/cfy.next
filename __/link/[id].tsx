import { GetStaticProps, GetStaticPaths } from 'next'
import logger from '@/logger'
import prisma from '@/prisma'
import { useDB } from '@/services/db/hook'
import { IEntitieLink } from '@/entities/link'

const log = logger.pages('Link')

export default function Link(props: { link: IEntitieLink }) {
  console.log(props)
  return <div>{/* Link: this is id: {link.id}, title: {link.title} */}</div>
}

export const getStaticProps: GetStaticProps = async (args) => {
  log('debug', 'getStaticProps', args)

  const link = await prisma.link.findFirst({
    where: {
      id: args?.params?.id as string,
    },
  })

  return {
    props: {
      link,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const links = await prisma.link.findMany()
  const paths = links.map(({ id }) => ({ params: { id } }))

  log('debug', 'getStaticPaths', paths)

  return {
    paths,
    fallback: true,
  }
}
