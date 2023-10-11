import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UserLoginDto {
  @ApiProperty({ example: 'admin', description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  account: string

  @ApiProperty({ example: '123456', description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度最低为6位' })
  @MaxLength(300, { message: '密码长度最多为30位' })
  password: string
}

export class UserRegisterDto {
  @ApiProperty({ example: 'admin', description: '账号' })
  @IsNotEmpty({ message: '账号不能为空' })
  account: string

  @ApiProperty({ example: '航仔', description: '用户昵称' })
  @IsNotEmpty({ message: '用户昵称不能为空' })
  @MaxLength(8, { message: '用户昵称长度最多为8位' })
  name: string

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度最低为6位' })
  @MaxLength(30, { message: '密码长度最多为30位' })
  password: string

  @ApiProperty({
    example: '每个人都有签名、我希望你也有',
    description: '个人签名',
  })
  sign: string

  @ApiProperty({ example: '927898639@qq.com', description: '邮箱' })
  @IsEmail({}, { message: '请填写正确格式的邮箱' })
  email: string

  @ApiProperty({
    example: 'https://img2.baidu.com/it/u=2285567582,1185119578&fm=26&fmt=auto',
    description: '头像',
    required: false,
  })
  avatar: string

  @ApiProperty({
    example: 1,
    description: '账号状态',
    required: false,
    enum: [1, 2],
  })
  @IsOptional()
  @IsEnum([1, 2], { message: 'sex只能是1或者2' })
  @Type(() => Number)
  status: number
}

export class UserGetInfo {
  @ApiProperty({ example: 1, description: '用户ID' })
  id: number
}

export class UserAvatar {
  @ApiProperty({ example: '1', description: '用户ID' })
  userId: number
}

export class UserInfoDto {
  @ApiProperty({ example: '1', description: '用户ID' })
  id: number

  @ApiProperty({ example: '小李', description: '用户昵称' })
  name: string

  @ApiProperty({
    example: 1,
    description: '用户性别(未知: 1, 男: 2, 女: 3)',
  })
  sex: number
}
