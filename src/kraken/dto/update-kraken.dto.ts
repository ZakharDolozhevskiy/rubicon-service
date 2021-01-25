import { PartialType } from '@nestjs/mapped-types';
import { CreateKrakenDto } from './create-kraken.dto';

export class UpdateKrakenDto extends PartialType(CreateKrakenDto) { }
