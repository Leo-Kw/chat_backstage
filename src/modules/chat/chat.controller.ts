import { Controller, Get } from '@nestjs/common'
import { ChatService } from './chat.service'
// import { ApiTags } from '@nestjs/swagger'

@Controller('/chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get()
  getHello(): string {
    return this.ChatService.getHello()
  }
}
