import { IsString, MinLength, IsEmail, IsIn } from 'class-validator'

export class NewUserDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @MinLength(6)
  passwordRepeat: string
}
