import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server, Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from './entities/message.entity'
import { Repository } from 'typeorm'

@WebSocketGateway(3102, {
  path: '/chat',
  allowEIO3: true,
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageModle: Repository<MessageEntity>,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() private socket: Server

  @SubscribeMessage('sendMessage')
  async socketTest(@MessageBody() data: any) {
    const quoteUserId = null
    const quoteMessageId = null
    const roomId = 1
    const params = {
      ...data,
      quoteUserId,
      quoteMessageId,
      roomId,
    }
    const message = await this.MessageModle.save(params)
    const result = this.socket.emit('message', {
      data: message,
      msg: '有一条新消息',
    })
    return result
  }

  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto)
  // }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll()
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id)
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto)
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id)
  // }
}
