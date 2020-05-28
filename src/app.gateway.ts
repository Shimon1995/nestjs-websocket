/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3001, { path: '/websockets', namespace: '/' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger = new Logger('App gateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client ${client.id} connected.`);
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} disconnected.`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('message', 'text);
    // this.wss.emit('message', text); // Broadcast
    return { event: 'message', data: text };
  }

  @SubscribeMessage('msgToServer')
  handleServerMsg(client: Socket, text: string) /*: WsResponse<string> */ {
    // return { event: 'msgToClient', data: text };
    this.wss.emit('msgToClient', text);
  }
}
