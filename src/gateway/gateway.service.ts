import { Server, Socket } from 'socket.io'
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage
} from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  clients: Map<string, Socket> = new Map()

  subscriptions: Map<string, Set<string>> = new Map()

  handleConnection(client: Socket) {
    this.clients.set(client.id, client)
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id)
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(@ConnectedSocket() client: Socket, @MessageBody() event: string) {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set())
    }
    this.subscriptions.get(event).add(client.id)
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(@ConnectedSocket() client: Socket, @MessageBody() event: string) {
    if (this.subscriptions.has(event)) {
      this.subscriptions.get(event).delete(client.id)
    }
  }

  public emit(event, details) {
    const clientIds = this.subscriptions.get(event)
    // send events only to subscribed clients
    clientIds?.forEach(clientId => this.clients.has(clientId)
        ? this.clients.get(clientId).emit(event, details)
        // clean up from disconnected client ids
        : clientIds.delete(clientId))
  }
}