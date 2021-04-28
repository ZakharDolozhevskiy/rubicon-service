import { ConfigService } from '@nestjs/config'
import { Injectable, Scope, Inject } from '@nestjs/common'

import { OrderService } from '../orders/order.service'
import { OrderEntity } from '../orders/order.entity'
import { IMarketOrder } from '../orders/order.interface'
import { SocketGateway } from '../gateway/gateway.service'
import { PRICE_CHANGE_EVENT } from '../events/price.change'

import { KrakenPublicSocket, Events } from './websocket/public'
import { KRAKEN_CLIENT, KRAKEN_PAIRS, VENDOR_NAME } from './utils/constants'

const ccxt = require('ccxt')

@Injectable()
export class KrakenService {
  @Inject(KRAKEN_PAIRS)
  private pairs

  @Inject(OrderService)
  private orderService

  @Inject(SocketGateway)
  private socketGateway

  private client = new ccxt.kraken()

  private socket: KrakenPublicSocket = null

  constructor(private config: ConfigService) {
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe({ [Events.trade]: this.onPriceChange.bind(this) })
    this.client.apiKey = this.config.get('API_KEY')
    this.client.secret = this.config.get('API_SECRET')
  }

  private async onPriceChange(data) {
    const price = Number(data[1][0][0])
    const symbol = data[3]
    const threshold = this.config.get('ORDER_TARGET_THRESHOLD')

    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${VENDOR_NAME}`, { symbol, price })
    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${VENDOR_NAME}:${symbol}`, { price })

    const records = await this.orderService.searchInRange({
      priceFrom: price - price * threshold,
      priceTo: price + price * threshold,
      vendor: VENDOR_NAME,
      symbol
    })

    records.forEach(this.createOrder)
  }

  public async createOrder(order: OrderEntity) {
    return this.client.createOrder(order.symbol, order.type, order.side, order.amount, order.price)
  }

  private tradeBalance() {
    return {}
  }
}
