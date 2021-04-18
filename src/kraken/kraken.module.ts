import { Module, DynamicModule } from '@nestjs/common'
import { KrakenService } from './kraken.service'
import { KrakenController } from './kraken.controller'
import { KrakenPublicSocket, Events } from './websocket/public'
import { KRAKEN_CLIENT, KRAKEN_PAIRS } from './common/constants'
import { extractPairs } from './common/mappers'

const KrakenClient = require('kraken-api')

@Module({})
export class KrakenModule {
  static async register(): Promise<DynamicModule> {
    const client = new KrakenClient()

    return {
      module: KrakenModule,
      controllers: [
        KrakenController
      ],
      providers: [
        {
          provide: KRAKEN_CLIENT,
          useValue: client
        },
        {
          provide: KRAKEN_PAIRS,
          useValue: await (['ETH/USD'] || client.api('AssetPairs').then(extractPairs))
        },
        KrakenService
      ]
    }
  }
}
