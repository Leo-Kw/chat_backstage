import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatService } from './chat.service'
import { GetMessageDto, SearchHistoryDto } from './dto/chat.dto'

@Controller('/chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('/message/get')
  getMessage(@Body() params: GetMessageDto) {
    return this.ChatService.getMessage(params)
  }

  @Post('/message/search')
  searchHistory(@Body() params: SearchHistoryDto) {
    return this.ChatService.searchHistory(params)
  }
}
