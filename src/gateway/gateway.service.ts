import { Server, Socket } from 'socket.io'
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('new connection', client);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnect', client);
  }

  public emit(event, details) {

  }
}