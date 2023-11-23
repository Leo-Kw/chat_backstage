import { Module } from '@nestjs/common'
import { join, resolve } from 'path'
import { ChatModule } from './modules/chat/chat.module'
import { UserModule } from './modules/user/user.module'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'

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
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ChatModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
