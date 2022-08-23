import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { secret, whiteList } from 'src/config/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { headers, path, route } = context.switchToRpc().getData()

    if (whiteList.includes(path)) {
      return true
    }

    const token = headers.authorization || request.headers.authorization
    // const isGet = route.methods.get

    if (token) {
      const payload = this.verifyToken(token, secret)
      if (!payload) {
        throw new HttpException(
          '身份验证失败，请重新登录',
          HttpStatus.UNAUTHORIZED,
        )
      }
      // request.payload = payload
      return true
    } else {
      // if (isGet) return true
      throw new HttpException('你还没登录，请先登录', HttpStatus.UNAUTHORIZED)
    }
  }

  /**
   * @desc 全局校验token
   * @param token
   * @param secret
   * @returns
   */
  private verifyToken(token: string, secret: string): any {
    // return new Promise((resolve) => {
    //   jwt.verify(token, secret, (error, payload) => {
    //     if (error) {
    //       resolve(false)
    //     } else {
    //       resolve(payload)
    //     }
    //   })
    // })
    return jwt.verify(token, secret, (error, payload) => {
      if (error) {
        return false
      } else {
        return payload
      }
    })
  }
}
