import { Module } from '@nestjs/common'
import { ChatModule } from './modules/chat/chat.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [ChatModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
