import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('/api')
  await app.listen(process.env.PORT, () => {
    Logger.log(`API服务已经启动,服务请访问:http://localhost:3101`)
  })
}
bootstrap()
