import { IsString, IsPositive, IsNumber, IsIn } from 'class-validator'

export class CreateOrderDto {
  @IsIn(['buy', 'sell'])
  type: string

  @IsString()
  currency: string

  @IsPositive()
  @IsNumber()
  target: number

  @IsPositive()
  @IsNumber()
  amount: number
}