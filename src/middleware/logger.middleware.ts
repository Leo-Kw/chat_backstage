import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger()

  use(req: Request, res: Response, next: NextFunction) {
    // start time
    const start = Date.now()
    const { method, originalUrl, ip, httpVersion, headers } = req
    const { statusCode } = res

    res.on('finish', () => {
      // end time
      const end = Date.now()
      const duration = end - start
      const logFormat = `${dayjs().valueOf()} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms ${
        headers['user-agent']
      }`

      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl)
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat, originalUrl)
      } else {
        this.logger.log(logFormat, originalUrl)
      }
    })

    next()
  }
}
