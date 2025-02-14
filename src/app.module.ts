import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [KrakenModule, OrderModule, EventEmitterModule.forRoot()]
})
export class AppModule {}
