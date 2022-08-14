import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { expiresIn, secret } from 'src/config/jwt'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
