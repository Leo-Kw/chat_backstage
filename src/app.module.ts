import { Module } from '@nestjs/common'
import { join, resolve } from 'path'
import { ChatModule } from './modules/chat/chat.module'
import { UserModule } from './modules/user/user.module'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'

const anotationClass = (id) => {
  console.log('anotationClass evaluated', id)
  return (target) => console.log('anotationClass executed', id)
}

const anotationMethods = (id) => {
  console.log('anotationMethods evaluated', id)
  return (target, property, descriptor) =>
    console.log('anotationMethods executed', id)
}

@anotationClass(1)
export class Example {
  @anotationMethods(1)
  methods() {
    console.log(1)
  }
}

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
