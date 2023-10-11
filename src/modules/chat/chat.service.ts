import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
// import { CreateChatDto } from './dto/create-chat.dto'
// import { UpdateChatDto } from './dto/update-chat.dto'
import { MessageEntity } from './entities/message.entity'
import { UserEntity } from '../user/user.entity'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageModel: Repository<MessageEntity>, // @InjectRepository(UserEntity) // private readonly UserModel: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
  ) {}

  async getMessage(params) {
    const { page = 1, pageSize = 300, roomId = 1 } = params
    const history = await this.MessageModel.find({
      where: { roomId },
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const userIds = history.map((item) => item.userId)

    const userInfoList = await this.UserModel.find({
      where: { id: In(userIds) },
      select: ['id', 'name', 'avatar', 'role'],
    })

    const result = history.map((item) => ({
      ...item,
      userInfo: userInfoList.find((userItem) => userItem.id === item.userId),
    }))

    return result.reverse()
  }
  uploadFile() {}
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
