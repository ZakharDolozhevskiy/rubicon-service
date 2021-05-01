import { Repository, Between } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common'
import { PRICE_CHANGE_EVENT } from '../events/price.change'
import { OrderEntity } from './order.entity'
import { IOrder, IOrderRange } from './order.interface'

@Injectable()
export class OrderService {
  @InjectRepository(OrderEntity)
  private repository: Repository<OrderEntity>

  public async create(payload: IOrder): Promise<OrderEntity> {
    // TODO: provide username from auth session
    return this.repository.save({ username: 'default', ...payload })
  }

  public async update(id: number, payload: Partial<IOrder>): Promise<OrderEntity> {
    const order = await this.repository.findOne({ id })
    return order ? this.repository.save({ ...order, ...payload }) : null
  }

  public delete(id: number) {
    return this.repository.delete({ id })
  }

  public async search(criteria: Partial<IOrder>): Promise<OrderEntity[]> {
    return this.repository.find({ where: { ...criteria } })
  }

  public async searchInRange(criteria: Partial<IOrderRange>): Promise<OrderEntity[]> {
    const { priceFrom, priceTo, ...rest } = criteria
    const price = Between(priceFrom, priceFrom)
    return this.repository.find({ price, ...rest })
  }
}
