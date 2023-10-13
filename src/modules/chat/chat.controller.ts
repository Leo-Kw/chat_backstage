import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ChatService } from './chat.service'
import { GetMessageDto } from './dto/chat.dto'

@Controller('/chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('/message/get')
  getMessage(@Body() params: GetMessageDto) {
    return this.ChatService.getMessage(params)
  }
}
