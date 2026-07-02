import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { forwardRef } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private bot: TelegramBot | null = null;

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    this.logger.log('Telegram bot initialization started...');
    this.logger.log(`Bot token loaded: ${Boolean(token)}`);

    if (!token) {
      this.logger.warn('No Telegram bot token configured. Bot will stay disabled.');
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });

    this.bot.getMe().then((me) => {
      this.logger.log(`Connected as: ${me.username}`);
    }).catch((error) => {
      this.logger.error('Failed to connect to Telegram bot', error);
    });

    this.bot.on('webhook_error', (error) => {
      this.logger.error('Telegram webhook error', error);
    });

    this.bot.on('polling_error', async (error: any) => {
      this.logger.error('Telegram polling error', error);

      if (
        error?.code === 'ETELEGRAM' &&
        String(error?.response?.body?.description || '').includes('terminated by other getUpdates request')
      ) {
        this.logger.warn('Detected another Telegram polling session. The bot will stop retrying to avoid conflicts.');
        await this.bot?.stopPolling();
      }
    });

    this.bot.on('message', async (msg) => {
      const text = msg.text || '';
      const chatId = msg.chat.id;

      if (!text) {
        return;
      }

      this.logger.log(`Incoming message from chat ${chatId}: ${text}`);

      const normalizedText = text.trim().toLowerCase();

      if (normalizedText === '/stop' || normalizedText === 'stop') {
        await this.usersService.setNotificationsEnabled(String(chatId), false);
        await this.sendMessage(chatId, '🛑 Notifications turned off. Send /start to resume weather alerts.');
        return;
      }

      if (normalizedText === '/start' || normalizedText === 'start') {
        await this.usersService.setNotificationsEnabled(String(chatId), true);
        await this.sendMessage(chatId, '✅ WeatherGuard bot is active. Send any message and I will reply.');
        return;
      }

      if (text.startsWith('/start')) {
        await this.sendMessage(chatId, '✅ WeatherGuard bot is active. Send any message and I will reply.');
        return;
      }

      await this.sendMessage(chatId, `Thanks! I received: ${text}`);
    });

    this.bot.onText(/^\/start(?: (.+))?$/, async (msg, match) => {
      this.logger.log(`START command received for chat ${msg.chat.id}`);
      const payload = match?.[1]?.trim();
      this.logger.log(`Payload: ${payload ?? 'none'}`);

      if (payload) {
        await this.registerChat(msg.chat.id, payload);
      }

      await this.sendMessage(msg.chat.id, '✅ WeatherGuard bot is working!');
    });
  }

  async registerChat(chatId: string | number, clerkId: string) {
    if (!clerkId) {
      return null;
    }

    const result = await this.usersService.connectTelegram(clerkId, String(chatId));
    this.logger.log(`Linked telegram chat ${chatId} to clerk ${clerkId}`);
    return result;
  }

  async sendMessage(chatId: string | number, message: string) {
    if (!this.bot) {
      this.logger.warn('Telegram bot is not initialized.');
      return null;
    }

    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await this.bot.sendMessage(chatId, message);
      } catch (error) {
        lastError = error;
        this.logger.warn(`Telegram send attempt ${attempt}/3 failed for chat ${chatId}`);

        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    this.logger.error(`Telegram send failed after 3 attempts for chat ${chatId}`, lastError);
    return null;
  }
}