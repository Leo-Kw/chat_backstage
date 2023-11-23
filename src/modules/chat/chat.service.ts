import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'
// import { CreateChatDto } from './dto/create-chat.dto'
// import { UpdateChatDto } from './dto/update-chat.dto'
import { MessageEntity } from './entities/message.entity'
import { UserEntity } from '../user/entities/user.entity'
import { GetMessageDto, SearchHistoryDto } from './dto/chat.dto'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageModel: Repository<MessageEntity>, // @InjectRepository(UserEntity) // private readonly UserModel: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
  ) {}

  async getMessage(params: GetMessageDto) {
    const { page, pageSize, roomId } = params
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

  async searchHistory(params: SearchHistoryDto) {
    const { page, pageSize, roomId, search } = params
    const searchRes = await this.MessageModel.find({
      where: { roomId, messageContent: Like(`%${search}%`) },
      // order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const userIds = searchRes.map((item) => item.userId)

    const userInfoList = await this.UserModel.find({
      where: { id: In(userIds) },
      select: ['id', 'name', 'avatar', 'role'],
    })

    const result = searchRes.map((item) => ({
      ...item,
      userInfo: userInfoList.find((userItem) => userItem.id === item.userId),
    }))

    return result.reverse()
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
