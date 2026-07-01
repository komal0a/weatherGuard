import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
    polling: true,
  });

  onModuleInit() {
    console.log('Telegram bot initialized...');

    this.bot.on('message', (msg) => {
      console.log('Incoming:', msg.text);
    });

    this.bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
      console.log('START command received');
      console.log('Chat ID:', msg.chat.id);
      console.log('Payload:', match?.[1]);
    });
  }

  async sendMessage(chatId: string, message: string) {
    return this.bot.sendMessage(chatId, message);
  }
}