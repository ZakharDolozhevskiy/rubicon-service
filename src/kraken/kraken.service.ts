import { EventEmitter2 } from '@nestjs/event-emitter'
import { Injectable, Scope, Inject } from '@nestjs/common'
import { KrakenPublicSocket, Events } from './websocket/public'
import { PriceChangeEvent } from '../events/currency-pairs'
import { KRAKEN_CLIENT, KRAKEN_PAIRS } from './common/constants'

const KrakenClient = require('kraken-api')
@Injectable()
export class KrakenService {
  private socket: any = null

  constructor(
    @Inject(KRAKEN_CLIENT) private client,
    @Inject(KRAKEN_PAIRS) private pairs,
    private eventEmitter: EventEmitter2
  ) {
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe({ [Events.trade]: this.onPriceChange.bind(this) })
  }

  private onPriceChange(event) {
    this.eventEmitter.emit(
      'pair.price.change',
      new PriceChangeEvent({
        pair: event[3],
        provider: 'kraken',
        price: Number(event[1][0][0])
      })
    )
  }
}
