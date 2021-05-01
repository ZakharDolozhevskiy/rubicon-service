import { IUser } from './users.interface'
import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column({ type: 'citext' })
  password: string

  @Column({ default: null })
  createdAt: number
}
