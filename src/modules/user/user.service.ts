import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class UserService {
  getHello(): string {
    return 'user!'
  }

  /**
   * @desc 账号登录
   * @param params
   * @returns
   */
  async login(params): Promise<any> {
    const { userAccount, userPassword } = params
    console.log(userAccount, userPassword)
    if (userAccount !== userPassword) {
      throw new HttpException(
        { message: '账号或密码错误' },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
