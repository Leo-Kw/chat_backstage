import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { secret, whiteList } from 'src/config/jwt'
import { verifyToken } from 'src/utils/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { headers, path } = context.switchToRpc().getData()

    if (whiteList.includes(path)) {
      return true
    }

    const token = headers.authorization || request.headers.authorization
    // const isGet = route.methods.get

    if (token) {
      const payload = verifyToken(token, secret)
      if (!payload) {
        throw new HttpException(
          '身份验证失败，请重新登录',
          HttpStatus.UNAUTHORIZED,
        )
      }
      request.user = payload
      return true
    } else {
      // if (isGet) return true
      throw new HttpException('你还没登录，请先登录', HttpStatus.UNAUTHORIZED)
    }
  }
}
