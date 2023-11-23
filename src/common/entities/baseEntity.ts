import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
    transformer: {
      to: (value) => value,
      from: (value?: string) => (value ? new Date(value).getTime() : value),
    },
  })
  createdAt: number

  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
    transformer: {
      to: (value) => value,
      from: (value: string) => (value ? new Date(value).getTime() : value),
    },
  })
  updatedAt: number

  @DeleteDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'deleted_at',
    comment: '删除时间',
    transformer: {
      to: (value) => value,
      from: (value: string) => (value ? new Date(value).getTime() : value),
    },
  })
  deletedAt: number
}
