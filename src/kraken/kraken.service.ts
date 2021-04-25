import { ConfigService } from '@nestjs/config'
import { Injectable, Scope, Inject } from '@nestjs/common'

import { OrderService } from '../orders/order.service'
import { OrderEntity } from '../orders/order.entity'
import { SocketGateway } from '../gateway/gateway.service'
import { PRICE_CHANGE_EVENT } from '../events/price.change'

import { KrakenPublicSocket, Events } from './websocket/public'
import { KRAKEN_CLIENT, KRAKEN_PAIRS, VENDOR_NAME } from './utils/constants'

const KrakenClient = require('kraken-api')

@Injectable()
export class KrakenService {
  @Inject(KRAKEN_PAIRS)
  private pairs

  @Inject(KRAKEN_CLIENT)
  private client

  @Inject(OrderService)
  private orderService

  @Inject(SocketGateway)
  private socketGateway

  @Inject(ConfigService)
  private config

  private socket: KrakenPublicSocket = null

  constructor() {
    this.socket = new KrakenPublicSocket(this.pairs)
    this.socket.subscribe({ [Events.trade]: this.onPriceChange.bind(this) })
  }

  private async onPriceChange(data) {
    const price = Number(data[1][0][0])
    const currency = data[3]
    const threshold = this.config.get('ORDER_TARGET_THRESHOLD')

    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${VENDOR_NAME}`, { currency, price })
    this.socketGateway.emit(`${PRICE_CHANGE_EVENT}:${VENDOR_NAME}:${currency}`, { price })

    const orders = await this.orderService.searchInRange({
      priceFrom: price - (price * threshold),
      priceTo: price + (price * threshold),
      vendor: VENDOR_NAME,
      currency
    })

    this.resolveOrders(orders)
  }

  private async resolveOrders(orders: OrderEntity[]) {
    console.log(orders)
  }
}
