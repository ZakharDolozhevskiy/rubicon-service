import { IsOptional, IsPositive, IsInt } from 'class-validator'

export class UpdateOrderDto {
    @IsPositive()
    @IsInt()
    @IsOptional()
    amount: number

    @IsPositive()
    @IsInt()
    @IsOptional()
    price: number
}