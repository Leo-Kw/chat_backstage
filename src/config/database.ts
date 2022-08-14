import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

const developmentConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_DEV,
  port: 3306,
  username: process.env.USERNAEM_DEV,
  password: process.env.PASSWORD_DEV,
  database: process.env.DB_DATABASE_DEV,
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  logging: false,
  synchronize: true,
}

const productionConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_PRO,
  port: 3306,
  username: process.env.USERNAEM_PRO,
  password: process.env.PASSWORD_PRO,
  database: process.env.DB_DATABASE_PRO,
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  logging: false,
  synchronize: false,
}

const DatabaseConfig: DataSourceOptions =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default DatabaseConfig
