import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { hashSync, compareSync } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserModle: Repository<UserEntity>,
    private readonly JwtService: JwtService,
  ) {}

  // getHello(): string {
  //   return 'user!'
  // }

  /**
   * @desc 账号注册
   * @param params
   * @returns
   */
  async register(params) {
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
  async login(params): Promise<any> {
    const { account, password } = params
    const u: any = await this.UserModle.findOne({
      where: [{ account: account }],
    })
    if (!u) {
      throw new HttpException('该用户不存在！', HttpStatus.BAD_REQUEST)
    }
    const bool = compareSync(password, u.password)
    if (bool) {
      const { name, account, email, id, role } = u
      return {
        token: this.JwtService.sign({
          name,
          account,
          email,
          id,
          role,
        }),
      }
    } else {
      throw new HttpException(
        { message: '账号或密码错误' },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
