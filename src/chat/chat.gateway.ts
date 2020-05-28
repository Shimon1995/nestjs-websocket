/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IMessage } from './interfaces/message.interface';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: IMessage) {
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leaveRoom', room);
  }
}
