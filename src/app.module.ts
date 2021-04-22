import { join } from 'path';
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGatewayModule } from './gateway/gateway.module'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './orders/order.module'

@Module({
  imports: [
    OrderModule,
    SocketGatewayModule,
    KrakenModule.register(),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../src', 'playground') }),
    // TODO: dotenv
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-209-134-160.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'xnkjberjwjhrjm',
      password: 'bc5fbc373dcf5dafccd4ab8006edbde80a6dbc5e970a5a60669572b0707b936c',
      database: 'd8vkeaj9tc4g8t',
      entities: [],
    }),
  ]
})
export class AppModule {}
