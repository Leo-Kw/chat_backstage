import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../common/entities/baseEntity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 1000, comment: '用户账号' })
  account: string

  @Column({ type: 'varchar', length: 1000, comment: '用户密码' })
  password: string

  @Column({ default: 1, comment: '用户状态' })
  status: number

  @Column({ default: 1, comment: '用户性别' })
  sex: number

  @Column({ type: 'varchar', length: 12, comment: '用户昵称' })
  name: string

  @Column({ type: 'varchar', length: 64, comment: '用户邮箱' })
  email: string

  @Column({ length: 600, nullable: true, comment: '用户头像' })
  avatar: string

  @Column({ length: 10, default: 'viewer', comment: '用户权限' })
  role: string

  @Column({ length: 255, default: '每个人都有签名、我希望你也有...' })
  sign: string

  @Column({ length: 255, nullable: true, comment: '用户个人创建的房间Id' })
  room_id: string
}
