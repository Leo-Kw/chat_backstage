import { MiddlewareConsumer, Module } from '@nestjs/common'
import { join } from 'path'
import { ChatModule } from './modules/chat/chat.module'
import { UserModule } from './modules/user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { databaseConfig } from './config'
import { WinstonModule } from 'nest-winston'
import { winstonLogger } from './config/winston'
import { LoggerMiddleware } from './middleware'

// const DecoratorClass = (metadata: ModuleMetadata): ClassDecorator => {
//   console.log('DecoratorClass evaluated', metadata)
//   return (target) => console.log('DecoratorClass executed', metadata, target)
// }

// const DecoratorMethods = (id: number): MethodDecorator => {
//   console.log('DecoratorMethods evaluated', id)
//   return (target, property, descriptor) => {
//     console.log('DecoratorMethods executed', id, target, property, descriptor)
//     return descriptor
//   }
// }

// @DecoratorClass({})
// export class Example {
//   @DecoratorMethods(1)
//   methods() {
//     console.log(1)
//   }
// }

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => databaseConfig(config),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
      defaultMeta: winstonLogger.defaultMeta,
      exitOnError: false,
    }),
    ChatModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
