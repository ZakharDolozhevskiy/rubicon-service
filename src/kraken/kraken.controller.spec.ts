import { Test, TestingModule } from '@nestjs/testing';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';

describe('KrakenController', () => {
  let controller: KrakenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KrakenController],
      providers: [KrakenService],
    }).compile();

    controller = module.get<KrakenController>(KrakenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
