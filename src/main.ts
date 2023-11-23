import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { AppModule } from './app.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AuthGuard } from './guard'
import { createSwagger } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new IoAdapter(app))
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
  app.useGlobalGuards(new AuthGuard())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('/api')
  createSwagger(app)
  await app.listen(process.env.PORT, () => {
    process.title = '航仔的 chat room'
    Logger.log(`API服务已经启动,服务请访问:http://localhost:3101`)
    Logger.log(`WebSocket服务已经启动,服务请访问:http://localhost:3102`)
    Logger.log(`swagger已经启动,服务请访问:http://localhost:3101/docs`)
  })
}
bootstrap()
