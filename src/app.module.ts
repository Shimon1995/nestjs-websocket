import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from 'src/chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
  providers: [ChatGateway, AlertGateway],
  controllers: [AlertController],
})
export class AppModule {}
