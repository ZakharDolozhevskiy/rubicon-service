import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderService } from './order.service'
import { OrderEntity } from './order.entity'

@Module({
  providers: [OrderService],
  exports: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderEntity])]
})
export class OrderModule {}
