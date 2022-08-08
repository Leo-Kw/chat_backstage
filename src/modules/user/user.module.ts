import { Module } from '@nestjs/common'
import { ChatController } from './user.controller'
import { ChatService } from './user.service'

@Module({
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
