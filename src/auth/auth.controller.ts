import { Controller, Request, Post, Get, Inject, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { NewUserDto } from './dto/new.user.dto'

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private authService

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  async register(@Body() payload: NewUserDto) {
    return this.authService.register(payload)
  }
}
