import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import {
  UserAvatar,
  UserInfoDto,
  UserLoginDto,
  UserRegisterDto,
} from './dto/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { CommonRequest } from '../../common/interface'
import { Request } from 'express'

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

  @Post('/token/check')
  checkToken(@Req() req: Request) {
    return this.UserService.checkToken(req)
  }

  @Get('/info')
  getUserInfo(@Req() req: CommonRequest) {
    return this.UserService.getUserInfo(req.user)
  }

  @Post('/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UserAvatar,
    @Req() req: CommonRequest,
  ) {
    file.path = file.path.replace(/\\/g, '/')
    return this.UserService.saveAvatar({
      userId: req.user.id,
      avatar: file.path,
    })
  }

  @Post('/modify')
  modifyUserInfo(@Body() params: UserInfoDto) {
    return this.UserService.modifyUserInfo(params)
  }
}
