import { EventEmitter2 } from '@nestjs/event-emitter'
import { Injectable, Scope, Inject } from '@nestjs/common'
import { SocketGateway } from '../gateway/gateway.service'
import { PRICE_CHANGE_EVENT, IPriceChangeEvent } from '../events/price.change'
import { KrakenPublicSocket, Events } from './websocket/public'
import { KRAKEN_CLIENT, KRAKEN_PAIRS } from './common/constants'

const KrakenClient = require('kraken-api')

@Injectable()
export class KrakenService {
  private socket: KrakenPublicSocket = null

  constructor(
    private eventEmitter: EventEmitter2,
    private socketGateway: SocketGateway,
    @Inject(KRAKEN_CLIENT) private client,
    @Inject(KRAKEN_PAIRS) private pairs
  ) {
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe({ [Events.trade]: this.onPriceChange.bind(this) })
  }

  private onPriceChange(data) {
    const pair = data[3]
    const price = Number(data[1][0][0])
    const provider = 'kraken'
    this.eventEmitter.emit(PRICE_CHANGE_EVENT, { pair, provider, price })
    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${provider}`, { price, pair })
    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${provider}:${pair}`, { price })
  }

  public resolveOrder() {}
}
