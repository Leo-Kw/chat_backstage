import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import { CreateChatDto } from './dto/create-chat.dto'
// import { UpdateChatDto } from './dto/update-chat.dto'
import { MessageEntity } from './entities/message.entity'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageModel: Repository<MessageEntity>, // @InjectRepository(UserEntity) // private readonly UserModel: Repository<UserEntity>,
  ) {}

  async getRecord(params) {
    const { page = 1, pageSize = 300, roomId = 1 } = params
    const history = await this.MessageModel.find({
      where: { roomId },
      order: { id: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
    return history
  }
  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat'
  // }
  // findAll() {
  //   return `This action returns all chat`
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} chat`
  // }
  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} chat`
  // }
}
