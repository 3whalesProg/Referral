import { Request, Response, NextFunction } from 'express'
import logger from './logger'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`)
  res.on('finish', () => {
    logger.info(`Response status: ${res.statusCode}`)
  })

  next()
}

export default loggerMiddleware