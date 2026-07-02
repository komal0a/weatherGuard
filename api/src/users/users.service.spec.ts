import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TelegramService } from '../telegram/telegram.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndUpdate: jest.fn(),
            countDocuments: jest.fn(),
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should disable notifications for a chat when stop is requested', async () => {
    const findOneAndUpdate = jest.fn().mockResolvedValue({ telegramChatId: '123' });
    const model = service['userModel'] as any;
    model.findOneAndUpdate = findOneAndUpdate;

    await service.setNotificationsEnabled('123', false);

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { telegramChatId: '123' },
      { notificationsEnabled: false },
      { returnDocument: 'after' },
    );
  });
});
