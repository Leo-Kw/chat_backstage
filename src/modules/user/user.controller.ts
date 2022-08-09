import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { UserLoginDto } from './dto/login.user.dto'

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getHello(): string {
    return this.UserService.getHello()
  }

  @Post('/login')
  login(@Body() params: UserLoginDto) {
    return this.UserService.login(params)
  }
}
