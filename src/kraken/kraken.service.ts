import { Injectable, Scope } from '@nestjs/common'
import { CreateKrakenDto } from './dto/create-kraken.dto'
import { UpdateKrakenDto } from './dto/update-kraken.dto'

import { KrakenPublicSocket } from './ws/public'

const KrakenClient = require('kraken-api')
@Injectable()
export class KrakenService {
  private kraken: any = new KrakenClient()
  private socket: any = null
  private pairs: string[]

  constructor() {
    this.initialize()
  }

  async initialize() {
    this.pairs = await this.fetchPairs()
    this.socket = new KrakenPublicSocket(this.pairs)
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
}
