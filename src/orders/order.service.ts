import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
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
    return this.repository.save(payload)
  }

  public async update(id: number, payload: Partial<IOrder>): Promise<OrderEntity> {
    const order = await this.repository.findOne({ id })
    return this.repository.save({ ...order, ...payload })
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
