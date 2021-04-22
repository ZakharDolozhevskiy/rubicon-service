import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderEntity } from './order.entity'

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderEntity])]
})
export class OrderModule {}
