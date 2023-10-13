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
import { CreateChatDto } from './dto/chat.dto'
import { UserEntity } from '../user/entities/user.entity'

@WebSocketGateway(3102, {
  path: '/chat-socket',
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
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() private socket: Server

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateChatDto) {
    const params = {
      ...data,
      quoteUserId: null,
      quoteMessageId: null,
      roomId: 1,
    }
    const { userName, userRole, userId, ...restMessage } =
      await this.MessageModle.save(params)
    const userInfo = await this.UserModel.findOne({
      where: { id: userId },
      select: ['name', 'role', 'avatar', 'id'],
    })
    const result = this.socket.emit('message', {
      data: {
        userInfo,
        ...restMessage,
      },
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
