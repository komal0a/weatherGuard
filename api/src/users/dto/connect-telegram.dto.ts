import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectTelegramDto {
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;
}