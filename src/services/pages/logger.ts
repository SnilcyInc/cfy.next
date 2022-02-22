import { createLogger } from '@/services/logger'

export const createPageLogger = (pageName: string) =>
  createLogger('PageLogger:' + pageName)
