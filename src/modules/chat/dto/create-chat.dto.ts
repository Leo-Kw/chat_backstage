import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateChatDto {
  @ApiProperty({ example: 1, description: '用户ID', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  userId: 1

  @ApiProperty({ example: '哈哈哈哈', description: '内容', required: true })
  @IsNotEmpty({ message: '内容不能为空' })
  messageContent: string

  @ApiProperty({ example: 'text', description: '消息类型', required: true })
  messageType: 'text'

  @ApiProperty({ example: '卡说不定', description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: '卡说不定'

  @ApiProperty({ example: 'admin', description: '用户权限', required: true })
  userRole: 'admin'

  @ApiProperty({ example: '1', description: '用户头像', required: true })
  userAvatar: '1'
}
