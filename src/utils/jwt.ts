import { verify } from 'jsonwebtoken'
import { CommonRequest } from 'src/common/interface'

/**
 * @desc 全局校验token
 * @param token
 * @param secret
 * @returns
 */
export const verifyToken = (token: string, secret: string) => {
  // return new Promise((resolve) => {
  //   jwt.verify(token, secret, (error, payload) => {
  //     if (error) {
  //       resolve(false)
  //     } else {
  //       resolve(payload)
  //     }
  //   })
  // })
  return verify(token, secret, (error, payload) => {
    if (error) {
      return false
    } else {
      return payload
    }
  }) as unknown as boolean | CommonRequest
}
