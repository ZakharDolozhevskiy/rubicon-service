import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { SocketGatewayModule } from './gateway/gateway.module'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './orders/order.module'
import { OrderEntity } from './orders/order.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    // dev only playground
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../src', 'playground') }),
    // websocket interface
    SocketGatewayModule,
    // postgres database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_KEY,
      autoLoadEntities: true,
      synchronize: true
    }),
    OrderModule,
    KrakenModule.register()
  ]
})
export class AppModule {}
