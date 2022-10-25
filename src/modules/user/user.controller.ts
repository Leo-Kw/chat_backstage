import { Controller, Post, Body, Request, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { UserGetInfo, UserLoginDto, UserRegisterDto } from './dto/user.dto'

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('/register')
  register(@Body() params: UserRegisterDto) {
    return this.UserService.register(params)
  }

  @Post('/login')
  login(@Body() params: UserLoginDto) {
    return this.UserService.login(params)
  }

  @Get('/getUserInfo')
  getUserInfo(@Request() req) {
    return this.UserService.getUserInfo(req.payload)
  }
}
