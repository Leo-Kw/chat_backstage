import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway(3102, {
  path: '/chat',
  allowEIO3: true,
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() private socket: Server

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      event: 'hello',
      data: data,
      msg: 'rustfisher.com',
    }
  }

  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    return {
      msg1: '测试1',
      msg2: '测试2',
    }
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto)
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll()
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id)
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto)
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id)
  }
}
