import { Controller, Get } from '@nestjs/common'
import { ChatService } from './user.service'
// import { ApiTags } from '@nestjs/swagger'

@Controller('/user')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get()
  getHello(): string {
    return this.ChatService.getHello()
  }
}
