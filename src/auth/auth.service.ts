import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, Inject } from '@nestjs/common'
import { NewUserDto } from './dto/new.user.dto'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private jwtService

  @Inject(UsersService)
  private usersService

  private cipher: any

  private decipher: any

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.search({ email })
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (user && isPasswordMatch) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(payload: NewUserDto) {
    const { password, passwordRepeat, ...userData } = payload

    if (password !== passwordRepeat) {
      // error: password mismatch
      return
    }

    const user: IUser = await this.usersService.create({
      password: await bcrypt.hash(password, 10),
      ...userData
    })

    return this.login(user)
  }
}
