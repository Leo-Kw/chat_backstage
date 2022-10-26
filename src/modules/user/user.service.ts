import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { hashSync, compareSync } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { UserLoginDto, UserRegisterDto } from './dto/user.dto'
import { UserInfoType } from './user.type'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserModle: Repository<UserEntity>,
    private readonly JwtService: JwtService,
  ) {}

  /**
   * @desc 账号注册
   * @param params
   * @returns
   */
  async register(params: UserRegisterDto) {
    const { account, password, email } = params
    params.password = hashSync(password)
    const u: any = await this.UserModle.findOne({
      where: [{ account }, { email }],
    })
    if (u) {
      const tips = account === u.name ? '用户名' : '邮箱'
      throw new HttpException(`该${tips}已经存在了！`, HttpStatus.BAD_REQUEST)
    }
    await this.UserModle.save(params)
    return true
  }

  /**
   * @desc 账号登录
   * @param params
   * @returns
   */
  async login(params: UserLoginDto): Promise<any> {
    const { account, password } = params
    const u: any = await this.UserModle.findOne({
      where: { account },
      select: [
        'id',
        'sex',
        'name',
        'email',
        'sign',
        'role',
        'room_id',
        'avatar',
        'account',
        'password',
      ],
    })
    if (!u) {
      throw new HttpException('该用户不存在！', HttpStatus.BAD_REQUEST)
    }
    const bool = compareSync(password, u.password)
    const { password: dbPassword, ...rest } = u
    if (bool) {
      const { name, account, email, id, role } = u
      return {
        userInfo: rest,
        token: this.JwtService.sign({
          name,
          account,
          email,
          id,
          role,
        }),
      }
    } else {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @desc 获取用户信息
   * @param params
   * @returns
   */
  async getUserInfo(payload: UserInfoType) {
    const { id } = payload
    const u = await this.UserModle.findOne({
      where: { id },
      select: [
        'id',
        'sex',
        'name',
        'email',
        'sign',
        'role',
        'room_id',
        'avatar',
        'account',
      ],
    })
    return u
  }
}
