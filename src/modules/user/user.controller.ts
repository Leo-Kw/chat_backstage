import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import {
  UserAvatar,
  UserGetInfo,
  UserInfoDto,
  UserLoginDto,
  UserRegisterDto,
} from './dto/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'

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

  @Get('/info')
  getUserInfo(@Request() req) {
    return this.UserService.getUserInfo(req.payload)
  }

  @Post('/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UserAvatar,
  ) {
    file.path = file.path.replace(/\\/g, '/')
    return this.UserService.saveAvatar({
      userId: data.userId,
      avatar: file.path,
    })
  }

  @Post('/modify')
  modifyUserInfo(@Body() params: UserInfoDto) {
    return this.UserService.modifyUserInfo(params)
  }
}
