import {
  Controller,
  Post,
  HttpCode,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AlertGateway } from './alert.gateway';
import { SendAlertDTO } from './dto/send-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private alertGateway: AlertGateway) {}

  @Post()
  @HttpCode(200)
  sendAlertToAll(
    @Body(ValidationPipe) sendAlertDto: SendAlertDTO,
  ): SendAlertDTO {
    this.alertGateway.sendToAll(sendAlertDto.message);
    return sendAlertDto;
  }
}
