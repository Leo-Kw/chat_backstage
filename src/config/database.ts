import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

const developmentConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST_DEV'),
  port: 3306,
  username: configService.get('USERNAEM_DEV'),
  password: configService.get('PASSWORD_DEV'),
  database: configService.get('DB_DATABASE_DEV'),
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
})

const productionConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST_PRO'),
  port: 3306,
  username: configService.get('USERNAEM_PRO'),
  password: configService.get('PASSWORD_PRO'),
  database: configService.get('DB_DATABASE_PRO'),
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: false,
})

export const databaseConfig = (configService: ConfigService) =>
  process.env.NODE_ENV === 'development'
    ? developmentConfig(configService)
    : productionConfig(configService)
