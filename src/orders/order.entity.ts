import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  username: string

  @Column()
  target: number

  @Column()
  amount: number

  @Column()
  currency: string

  @Column()
  vendor: string

  @Column({ default: true })
  isActive: boolean
}
