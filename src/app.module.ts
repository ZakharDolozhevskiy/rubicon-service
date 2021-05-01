import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'

import { SocketGatewayModule } from './gateway/gateway.module'
import { KrakenModule } from './kraken/kraken.module'
import { OrderModule } from './order/order.module'
import { OrderEntity } from './order/order.entity'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
    UsersModule,
    OrderModule,
    KrakenModule.register()
  ]
})
export class AppModule {}
