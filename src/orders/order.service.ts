import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { OrderEntity } from './order.entity'
import { IOrder } from './order.interface'

import { PRICE_CHANGE_EVENT, IPriceChangeEvent } from '../events/price.change'
import { Order } from 'ccxt';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
    private eventEmitter: EventEmitter2
  ) {}

  public async create(payload: IOrder): Promise<OrderEntity> {
    return this.repository.save({
      // TODO: provide username from auth session
      username: 'default',
      ...payload
    })
  }

  public async update(id: number, payload: Partial<IOrder>): Promise<OrderEntity | HttpException> {
    const order = await this.repository.findOne({ id })

    return order
      ? this.repository.save({ ...order, ...payload })
      : new HttpException({ error: 'no such order' }, HttpStatus.BAD_REQUEST)
  }

  public delete(id: number) {
    return this.repository.delete({ id })
  }

  public async search(criteria: Partial<IOrder>): Promise<OrderEntity[]> {
    return this.repository.find({ where: { ...criteria } });
  }

  @OnEvent(PRICE_CHANGE_EVENT)
  handlePairPriceChange(event: IPriceChangeEvent) {
    //console.log(event, 'pair.price.change')
  }
}
