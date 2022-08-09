import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3101, () => {
    Logger.log(`API服务已经启动,服务请访问:http://localhost:3101`)
  })
}
bootstrap()
