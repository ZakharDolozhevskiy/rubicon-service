import { EventEmitter2 } from '@nestjs/event-emitter'
import { SocketGateway } from '../gateway/gateway.service'
import { Injectable, Scope, Inject } from '@nestjs/common'
import { KrakenPublicSocket, Events } from './websocket/public'
import { PriceChangeEvent } from '../events/currency-pairs'
import { KRAKEN_CLIENT, KRAKEN_PAIRS } from './common/constants'

const EventEmitter = require('events')
const KrakenClient = require('kraken-api')
@Injectable()
export class KrakenService extends EventEmitter {
  private socket: KrakenPublicSocket = null

  constructor(
    private eventEmitter: EventEmitter2,
    private socketGateway: SocketGateway,
    @Inject(KRAKEN_CLIENT) private client,
    @Inject(KRAKEN_PAIRS) private pairs
  ) {
    super()
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe({ [Events.trade]: this.onPriceChange.bind(this) })
  }

  private onPriceChange(event) {
    const ev = new PriceChangeEvent({ pair: event[3], provider: 'kraken', price: Number(event[1][0][0]) })
    this.eventEmitter.emit('pair.price.change', ev)
    this.emit('pair.price.change', ev)
  }

  public resolveOrder() {}
}
