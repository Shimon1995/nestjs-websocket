import { IsString } from 'class-validator';

export class SendAlertDTO {
  @IsString()
  message: string;
}
