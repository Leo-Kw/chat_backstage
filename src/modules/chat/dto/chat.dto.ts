import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateChatDto {
  @ApiProperty({ example: 1, description: '用户ID', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  userId: number

  @ApiProperty({ example: '哈哈哈哈', description: '内容', required: true })
  @IsNotEmpty({ message: '内容不能为空' })
  messageContent: string

  @ApiProperty({ example: 'text', description: '消息类型', required: true })
  messageType: string

  @ApiProperty({ example: '卡说不定', description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string

  @ApiProperty({ example: 'admin', description: '用户权限', required: true })
  userRole: string

  @ApiProperty({ example: '1', description: '用户头像', required: true })
  userAvatar: string
}

export class UpdateChatDto extends PartialType(CreateChatDto) {}

export class GetMessageDto {
  @ApiProperty({ example: 1, description: '当前页', required: true })
  @IsNotEmpty({ message: '当前页不能为空' })
  page: number

  @ApiProperty({ example: 20, description: '每页大小', required: true })
  @IsNotEmpty({ message: '每页大小不能为空' })
  pageSize: number

  @ApiProperty({ example: 1, description: '房间ID', required: true })
  @IsNotEmpty({ message: '房间ID不能为空' })
  roomId: number
}

export class SearchHistoryDto {
  @ApiProperty({ example: '123', description: '搜索条件', required: true })
  @IsNotEmpty({ message: '搜索条件不能为空' })
  search: string

  @ApiProperty({ example: 1, description: '当前页', required: true })
  @IsNotEmpty({ message: '当前页不能为空' })
  page: number

  @ApiProperty({ example: 20, description: '每页大小', required: true })
  @IsNotEmpty({ message: '每页大小不能为空' })
  pageSize: number

  @ApiProperty({ example: 1, description: '房间ID', required: true })
  @IsNotEmpty({ message: '房间ID不能为空' })
  roomId: number
}
