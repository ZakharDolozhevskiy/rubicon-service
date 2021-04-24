import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { OrderEntity } from './order.entity'
import { IOrder } from './order.interface'

import { PRICE_CHANGE_EVENT, IPriceChangeEvent } from '../events/price.change'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    private eventEmitter: EventEmitter2
  ) {}

  public create(payload: IOrder) { }

  public update(id: number, payload: Partial<IOrder>) { }

  public delete(id: number) { }

  public search(criteria: Partial<IOrder>) { }

  @OnEvent(PRICE_CHANGE_EVENT)
  handlePairPriceChange(event: IPriceChangeEvent) {
    //console.log(event, 'pair.price.change')
  }
}
