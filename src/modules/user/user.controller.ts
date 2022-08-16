import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { UserLoginDto } from './dto/login.user.dto'
import { UserRegisterDto } from './dto/register.user.dto'

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
}
