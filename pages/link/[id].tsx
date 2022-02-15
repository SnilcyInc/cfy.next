import { GetStaticProps, GetStaticPaths } from 'next'
import prisma, { IDBLink } from '@/prisma'
import logger from '@/logger'

const log = logger.pages('Link')

export default function Link({ link }: { link: IDBLink }) {
  return (
    <div>
      Link: this is id: {link.id}, title: {link.title}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (args) => {
  log('debug', 'getStaticProps', args)

  const { params = {} } = args

  const link = {
    ...(await prisma.link.findUnique({
      where: {
        id: params.id as string,
      },
    })),
  }

  delete link?.createdAt
  delete link?.updatedAt

  return {
    props: {
      link,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await prisma.link.findMany()).map(({ id }) => ({
    params: {
      id,
    },
  }))

  log('debug', 'getStaticPaths', paths)

  return {
    paths,
    fallback: true,
  }
}
