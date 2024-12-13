import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { hashSync, compareSync } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { UserInfoDto, UserLoginDto, UserRegisterDto } from './dto/user.dto'
import { UserInfoType } from './user.type'
import { removeFile } from '../../utils'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
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
    const u: any = await this.UserModel.findOne({
      where: [{ account }, { email }],
    })
    if (u) {
      const tips = account === u.name ? '用户名' : '邮箱'
      throw new HttpException(`该${tips}已经存在了！`, HttpStatus.BAD_REQUEST)
    }
    await this.UserModel.save(params)
    return true
  }

  /**
   * @desc 账号登录
   * @param params
   * @returns
   */
  async login(params: UserLoginDto): Promise<any> {
    const { account, password } = params
    const u = await this.UserModel.findOne({
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  async getUserInfo(params: UserInfoType) {
    const { id } = params
    const u = await this.UserModel.findOne({
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

  /**
   * @desc 保存用户头像
   * @param params
   * @returns
   */
  async saveAvatar(params: { avatar: string; userId: number }) {
    const { userId, avatar } = params
    const host =
      process.env.NODE_ENV === 'development'
        ? process.env.HOST_DEV
        : process.env.HOST_PRO
    const u = await this.UserModel.findOne({ where: { id: userId } })
    u.avatar &&
      removeFile('./public/uploads/' + u.avatar.match(/uploads\/(\S*)/)[1])
    await this.UserModel.update(
      { id: userId },
      { avatar: host + avatar.match(/public\/(\S*)/)[1] },
    )
    return true
  }
  /**
   * @desc 修改用户信息
   * @param params
   * @returns
   */
  async modifyUserInfo(params: UserInfoDto) {
    const { id, name, sex } = params
    await this.UserModel.update(
      { id },
      {
        name,
        sex,
      },
    )
    return true
  }
}
