import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { AppModule } from './app.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AuthGuard } from './guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new IoAdapter(app))
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthGuard())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('/api')
  await app.listen(process.env.PORT, () => {
    Logger.log(`API服务已经启动,服务请访问:http://localhost:3101`)
    Logger.log(`WebSocket服务已经启动,服务请访问:http://localhost:3102`)
  })
}
bootstrap()
