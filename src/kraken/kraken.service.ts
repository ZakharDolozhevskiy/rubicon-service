import { EventEmitter2 } from '@nestjs/event-emitter'
import { Injectable, Scope } from '@nestjs/common'
import { KrakenPublicSocket } from './websocket/public'
import { PairPriceChangeEvent } from '../events/currency-pairs'

const KrakenClient = require('kraken-api')
@Injectable()
export class KrakenService {
  private kraken: any = new KrakenClient()
  private socket: any = null
  private pairs: string[]

  constructor(private eventEmitter: EventEmitter2) {
    this.initialize()
  }

  async initialize() {
    this.pairs = await this.fetchPairs()
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe('pairs.price.change', (event) => this.onPriceChange(event))
  }

  async fetchPairs() {
    const response = await this.kraken.api('AssetPairs')
    return Object.values(response.result)
      .map((pair: any): string => pair.wsname)
      .filter((pair: string): boolean => !!pair)
  }

  async getSocketToken() {
    return {
      token: await this.kraken.GetWebSocketsToken(),
      expire: 15 * 60 * 1000
    }
  }

  onPriceChange(event) {
    this.eventEmitter.emit(
      'pair.price.change',
      new PairPriceChangeEvent({
        provider: 'kraken',
        pair: event[3],
        price: event[1][0][0]
      })
    )
  }
}
