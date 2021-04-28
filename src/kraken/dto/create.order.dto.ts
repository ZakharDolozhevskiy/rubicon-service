import { IsString, IsPositive, IsNumber, IsIn } from 'class-validator'

export class CreateOrderDto {
  @IsIn(['buy', 'sell'])
  side: string

  @IsString()
  symbol: string

  @IsPositive()
  @IsNumber()
  price: number

  @IsPositive()
  @IsNumber()
  amount: number
}