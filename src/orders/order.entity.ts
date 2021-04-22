import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user: string

  @Column()
  target: number

  @Column()
  price: number

  @Column()
  amount: number

  @Column()
  pair: string

  @Column()
  vendor: string

  @Column({ default: true })
  isActive: boolean
}
