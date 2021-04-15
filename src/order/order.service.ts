import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { PriceChangeEvent } from '../events/currency-pairs'

@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('pair.price.change')
  handlePairPriceChange(payload: PriceChangeEvent) {
    console.log(payload, 'pair.price.change')
  }
}
