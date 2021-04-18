import { join } from 'path';
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SocketGatewayModule } from './gateway/gateway.module'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [
    OrderModule,
    SocketGatewayModule,
    KrakenModule.register(),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../src', 'playground') })
  ]
})
export class AppModule {}
