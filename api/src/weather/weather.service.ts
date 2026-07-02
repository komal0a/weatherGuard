import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCurrentWeather() {
    const city = this.configService.get<string>('WEATHER_CITY') ?? 'Chandigarh';
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');

    if (!apiKey) {
      this.logger.warn('Weather API key is not configured. Returning fallback weather data.');
      return this.getFallbackWeather(city);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      return {
        city: data.name ?? city,
        temperature: data.main?.temp ?? 0,
        humidity: data.main?.humidity ?? 0,
        weather: data.weather?.[0]?.main ?? 'Unavailable',
        description: data.weather?.[0]?.description ?? 'Weather data is currently unavailable.',
      };
    } catch (error) {
      this.logger.error('Weather API request failed. Using fallback weather data.', error);
      return this.getFallbackWeather(city);
    }
  }

  private getFallbackWeather(city: string) {
    return {
      city,
      temperature: 24,
      humidity: 65,
      weather: 'Unavailable',
      description: 'Weather data is not configured or could not be fetched right now.',
    };
  }
}