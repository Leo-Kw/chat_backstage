import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ChatService } from './chat.service'

@Controller('/chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('/getRecord')
  getRecord(@Body() params: any) {
    return this.ChatService.getRecord(params)
  }
}
