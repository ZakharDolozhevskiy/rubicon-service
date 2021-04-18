import { Server, Socket } from 'socket.io'
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('new connection')
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnect')
  }

  public emit(event, details) {
    this.server.emit(event, details)
  }
}