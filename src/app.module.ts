import { Module } from '@nestjs/common'
import { resolve } from 'path'
import { ChatModule } from './modules/chat/chat.module'
import { UserModule } from './modules/user/user.module'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        console.log(config.get('database'))
        return config.get('database')
      },
      inject: [ConfigService],
    }),
    ChatModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
