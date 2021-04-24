import { IsString, IsPositive, IsInt, IsIn } from 'class-validator'

export class CreateOrderDto {
  @IsIn(['buy', 'sell'])
  type: string

  @IsString()
  currency: string

  @IsPositive()
  @IsInt()
  target: number

  @IsPositive()
  @IsInt()
  amount: number
}