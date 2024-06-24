import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { promisify } from 'util'
import { UserEntity } from './users.entity'
import { UsersService } from './users.service'
import { UserController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UserController]
})
export class UsersModule {}
