import { Module, Global } from '@nestjs/common'
import { SocketGateway } from './gateway.service'

@Global()
@Module({
  providers: [SocketGateway],
  exports: [SocketGateway]
})
export class SocketGatewayModule {}
