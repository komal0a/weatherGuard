import { Module } from '@nestjs/common';

import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

import { UsersModule } from '../users/users.module';
import { WeatherModule } from '../weather/weather.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    UsersModule,
    WeatherModule,
    TelegramModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}