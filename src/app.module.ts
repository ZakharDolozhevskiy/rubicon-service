import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SocketGatewayModule } from './gateway/gateway.module'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [
    OrderModule,
    KrakenModule.register(),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: './playground' }),
    SocketGatewayModule
  ]
})
export class AppModule {}
