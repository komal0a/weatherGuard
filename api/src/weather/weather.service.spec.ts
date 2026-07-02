import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'WEATHER_API_KEY') {
                return undefined;
              }
              if (key === 'WEATHER_CITY') {
                return 'Chandigarh';
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns a fallback weather payload when the API key is missing', async () => {
    const httpService = {
      get: jest.fn(),
    } as unknown as HttpService;

    const configService = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as ConfigService;

    const fallbackService = new (WeatherService as any)(httpService, configService);
    const result = await fallbackService.getCurrentWeather();

    expect(result.weather).toBe('Unavailable');
    expect(result.description).toContain('not configured');
  });
});
