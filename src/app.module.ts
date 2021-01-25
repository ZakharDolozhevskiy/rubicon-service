import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KrakenModule } from './kraken/kraken.module';

@Module({
  imports: [KrakenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
