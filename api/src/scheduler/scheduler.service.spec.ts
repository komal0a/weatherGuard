import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { WeatherService } from '../weather/weather.service';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getApprovedUsers: jest.fn(),
          },
        },
        {
          provide: TelegramService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
