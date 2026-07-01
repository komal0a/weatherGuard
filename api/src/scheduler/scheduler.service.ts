import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { WeatherService } from '../weather/weather.service';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly weatherService: WeatherService,
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
  ) {}

  @Cron('*/1 * * * *')
  async sendWeatherAlerts() {
    this.logger.log('Running weather scheduler...');

    try {
      const weather = await this.weatherService.getCurrentWeather();

      const users = await this.usersService.getApprovedUsers();

      if (!users.length) {
        this.logger.log('No approved users found.');
        return;
      }

      const message = `🌤 Weather Update

📍 ${weather.city}

🌡 Temperature: ${weather.temperature}°C

☁️ Weather: ${weather.weather}

📝 ${weather.description}

💧 Humidity: ${weather.humidity}%`;

      for (const user of users) {
        try {
          await this.telegramService.sendMessage(
            user.telegramChatId,
            message,
          );

          this.logger.log(`Alert sent to ${user.email}`);
        } catch (error) {
          this.logger.error(
            `Failed to send alert to ${user.email}`,
          );
        }
      }
    } catch (error) {
      this.logger.error('Weather scheduler failed', error);
    }
  }
}