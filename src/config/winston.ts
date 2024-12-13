import * as chalk from 'chalk' // 用于颜色化输出
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

// 定义日志级别颜色
const levelsColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  verbose: 'cyan',
}

export const winstonLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'chat-log-service' },
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/errors/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/warning/waring-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'warn',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/app/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: levelsColors }),
        format.simple(),
        format.printf((info) => {
          const symbols = Object.getOwnPropertySymbols(info)
          const color = levelsColors[info[symbols[0]] as string] // 获取日志级别的颜色
          const chalkColor = chalk[color]
          const message = `${info.timestamp} ${chalkColor(info[symbols[2]])}`
          return message
        }),
      ),
      level: 'debug',
    }),
  ],
})
