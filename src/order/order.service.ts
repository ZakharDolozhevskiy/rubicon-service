import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { PRICE_CHANGE_EVENT, IPriceChangeEvent } from '../events/price.change'

@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent(PRICE_CHANGE_EVENT)
  handlePairPriceChange(event: IPriceChangeEvent) {
    //console.log(event, 'pair.price.change')
  }
}
