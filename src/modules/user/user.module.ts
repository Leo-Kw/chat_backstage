import { BadRequestException, Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import * as dayjs from 'dayjs'

import { expiresIn, secret } from 'src/config/jwt'
import { UserController } from './user.controller'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'
import { checkDirAndCreate } from '../../utils'

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp']
const video = ['mp4', 'webm']
const audio = ['mp3', 'wav', 'ogg']

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn,
      },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const mimeType = file.mimetype.split('/')[1]
          let temp = 'other'
          image.filter((item) => item === mimeType).length > 0
            ? (temp = 'image')
            : ''
          video.filter((item) => item === mimeType).length > 0
            ? (temp = 'video')
            : ''
          audio.filter((item) => item === mimeType).length > 0
            ? (temp = 'audio')
            : ''
          const filePath = `public/uploads/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`
          checkDirAndCreate(filePath) // Determine whether the folder exists
          return cb(null, `./${filePath}`)
        },
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const fileType = file.originalname.split('.')
          const filename = `${dayjs().valueOf()}.${
            fileType[fileType.length - 1]
          }`
          return cb(null, filename)
        },
      }),
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase()
        let temp = 'other'
        image.filter((item) => item === mimeType).length > 0
          ? (temp = 'image')
          : ''
        video.filter((item) => item === mimeType).length > 0
          ? (temp = 'video')
          : ''
        audio.filter((item) => item === mimeType).length > 0
          ? (temp = 'audio')
          : ''
        if (temp === 'other') {
          return cb(new BadRequestException('文件格式错误！'), false)
        }
        return cb(null, true)
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
