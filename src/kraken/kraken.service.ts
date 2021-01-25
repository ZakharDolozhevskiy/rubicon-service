import { Injectable, Scope } from '@nestjs/common';
import { CreateKrakenDto } from './dto/create-kraken.dto';
import { UpdateKrakenDto } from './dto/update-kraken.dto';

const ccxt = require('ccxt');

@Injectable({ scope: Scope.REQUEST })
export class KrakenService {
  private readonly api: any = new ccxt.kraken();

  create(createKrakenDto: CreateKrakenDto) {
    return 'This action adds a new kraken';
  }

  findAll(): string {
    console.log(this.api);
    return `This action returns all kraken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kraken`;
  }

  update(id: number, updateKrakenDto: UpdateKrakenDto) {
    return `This action updates a #${id} kraken`;
  }

  remove(id: number) {
    return `This action removes a #${id} kraken`;
  }
}
