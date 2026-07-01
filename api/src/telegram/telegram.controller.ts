import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
  ) {}

  @Get('test')
  async test() {
    await this.telegramService.sendMessage(
      '1021570701',
      '🎉 Telegram integration working!',
    );

    return {
      success: true,
    };
  }
}