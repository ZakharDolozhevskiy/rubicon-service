import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create.order.dto';

export class UpdateOrderDto {
    amount: number
    target: number
}