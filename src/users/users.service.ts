import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, Inject, Injectable } from '@nestjs/common'
import { createCipheriv, createDecipheriv, scrypt, createHash } from 'crypto'

import { IUser } from './users.interface'
import { UserEntity } from './users.entity'

const iv = 'ancdfgseghwefgry'
@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private repository: Repository<UserEntity>

  private cipherKey: Buffer

  private resizedIV: Buffer

  constructor(private config: ConfigService) {
    this.cipherKey = createHash('sha256').update(this.config.get('USER_CIPHER_KEY')).digest()
    this.resizedIV = Buffer.from(this.config.get('USER_CIPHER_IV'))
  }

  public async search(criteria: Partial<IUser>): Promise<IUser | null> {
    return this.repository.findOne({ where: { ...criteria } })
  }

  public async create(params: Partial<IUser>): Promise<IUser> {
    const user = await this.search({ email: params.email })

    if (user) {
      // error: user already exists
      return
    }

    return this.repository.save({ ...params })
  }

  public async update(params: Partial<IUser>): Promise<void> {}

  public async delete(): Promise<void> {}

  public async addApiKeys(userId: string, newKeys: Record<string, any>): Promise<any> {
    const user = await this.search({ id: userId })
    const keys = JSON.parse(user.keys)

    for (const provider in newKeys) {
      const cipher = createCipheriv('aes256', this.cipherKey, this.resizedIV)
      const result = [cipher.update(newKeys[provider], 'binary', 'hex'), cipher.final('hex')]
      newKeys[provider] = result.join('')
    }

    return this.repository.save({ ...user, keys: JSON.stringify({ ...keys, ...newKeys }) })
  }

  public async getApiKeys(userId: string, provider: string): Promise<any> {
    const user = await this.search({ id: userId })
    const key = JSON.parse(user.keys)[provider]
    const decipher = createDecipheriv('aes256', this.cipherKey, this.resizedIV)
    return [decipher.update(key, 'hex', 'binary'), decipher.final('binary')].join('')
  }
}
