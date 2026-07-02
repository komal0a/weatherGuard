import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';

describe('TelegramService', () => {
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelegramService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'TELEGRAM_BOT_TOKEN') {
                return undefined;
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
