import { IMarketOrder } from './order.interface'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class OrderEntity implements IMarketOrder {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  side: 'sell' | 'buy'

  @Column({ default: 'market' })
  type: 'market' | 'limit'

  @Column()
  username: string

  @Column({ type: 'numeric' })
  price: number

  @Column()
  amount: number

  @Column()
  symbol: string

  @Column()
  vendor: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: null })
  externalId: number
}
