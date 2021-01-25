import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { KrakenService } from './kraken.service';
import { CreateKrakenDto } from './dto/create-kraken.dto';
import { UpdateKrakenDto } from './dto/update-kraken.dto';

@Controller('kraken')
export class KrakenController {
  constructor(private readonly krakenService: KrakenService) { }

  @Post()
  create(@Body() createKrakenDto: CreateKrakenDto) {
    return this.krakenService.create(createKrakenDto);
  }

  @Get()
  findAll(): string {
    return this.krakenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.krakenService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateKrakenDto: UpdateKrakenDto) {
    return this.krakenService.update(+id, updateKrakenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.krakenService.remove(+id);
  }
}
