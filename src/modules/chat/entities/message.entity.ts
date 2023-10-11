import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entity/baseEntity'

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
  @Column({ name: 'user_id', comment: '用户id' })
  userId: number

  @Column({ name: 'room_id', comment: '房间ID' })
  roomId: number

  @Column({ name: 'message_content', type: 'text' })
  messageContent: string

  @Column({ name: 'message_type', length: 64, comment: '消息类型' })
  messageType: string

  @Column({
    name: 'quote_user_id',
    nullable: true,
    comment: '引用消息人的id[引用了谁的消息]',
  })
  quoteUserId: number

  @Column({ name: 'quote_message_id', nullable: true, comment: '引用的消息ID' })
  quoteMessageId: number

  @Column({
    name: 'message_status',
    comment: '消息状态 1: 正常 -1: 已撤回',
    default: 1,
  })
  messageStatus: number
}
