import { Controller, Request, Post, Get, Inject, Body, UseGuards, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
  @Inject(UsersService)
  private usersService

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { password, keys, createdAt, ...data } = await this.usersService.search({
      id: req.user.userId
    })
    return data
  }

  @UseGuards(JwtAuthGuard)
  @Post('keys')
  async addApiKeys(@Request() req, @Body() keys: Record<string, string>) {
    await this.usersService.addApiKeys(req.user.userId, keys)
  }

  @UseGuards(JwtAuthGuard)
  @Get('keys')
  async getApiKeys(@Request() req, @Query('provider') provider) {
    return this.usersService.getApiKeys(req.user.userId, provider)
  }
}
