import { Module } from '@nestjs/common'
import { KrakenService } from './kraken.service'
import { KrakenController } from './kraken.controller'
@Module({
  controllers: [KrakenController],
  providers: [KrakenService]
})
export class KrakenModule {}
