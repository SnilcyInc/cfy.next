import { createLogger } from '@/services/logger'

export const createPageLogger = (pageName: string) =>
  createLogger('page:' + pageName)
