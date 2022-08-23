/**
 * @desc  权限部分暂时没做扩展 只有基础权限按接口加请求方式来区分
 */

export const secret = 'hangzai_chat'
export const expiresIn = '10s'
export const whiteList = [
  '/api/user/login',
  '/api/user/register',
  '/api/upload/file',
]

/**
 * post 请求的白名单，不限制身份的
 */
export const postWhiteList = [
  '/api/comment/set',
  '/api/user/update',
  '/api/chat/history',
]
