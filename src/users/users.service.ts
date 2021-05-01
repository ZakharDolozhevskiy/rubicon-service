import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from './users.interface'
import { UserEntity } from './users.entity'

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private repository: Repository<UserEntity>

  public async search(criteria: Partial<IUser>): Promise<IUser | null> {
    return this.repository.findOne({ where: { ...criteria } })
  }

  public async create(params: Partial<IUser>): Promise<IUser> {
    const user = await this.repository.findOne({ email: params.email })

    if (user) {
      // error: user already exists
    }

    return this.repository.save({ ...params })
  }

  public async update(params: Partial<IUser>): Promise<void> {}

  public async delete(): Promise<void> {}

  public async addKeys(provider: string, keys: any): Promise<any> {}

  public async getKeys(provider: string): Promise<any> {}
}
