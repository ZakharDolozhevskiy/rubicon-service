import { IsNumberString } from 'class-validator'

export class OrderParams {
  @IsNumberString()
  id: number
}
