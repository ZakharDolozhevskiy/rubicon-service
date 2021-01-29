import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [KrakenModule, OrderModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
