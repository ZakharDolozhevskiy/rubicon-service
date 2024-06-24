import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './strategies/auth.jwt.strategy'
import { LocalStrategy } from './strategies/auth.local.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('AUTH_SECRET')
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
