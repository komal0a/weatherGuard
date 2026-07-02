import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserStatus,
  UserRole,
} from './schema/user.schema';
import { TelegramService } from '../telegram/telegram.service';
import { RequestAccessDto } from './dto/request-access.dto';

@Injectable()
export class UsersService {
  constructor(
  @InjectModel(User.name)
  private userModel: Model<User>,

  private telegramService: TelegramService,
) {}

  async requestAccess(data: RequestAccessDto) {
    const existing = await this.userModel.findOne({
      clerkId: data.clerkId,
    });

    if (existing) {
      return existing;
    }

    return this.userModel.create({
  name: data.name,
  email: data.email,
  clerkId: data.clerkId,
  status: UserStatus.PENDING,
  role: UserRole.USER,
});
  }

  async getPendingUsers() {
    return this.userModel.find({
      status: UserStatus.PENDING,
    });
  }

 async approveUser(id: string) {
  const user = await this.userModel.findByIdAndUpdate(
    id,
    {
      status: UserStatus.APPROVED,
    },
    {
      returnDocument: 'after',
    },
  );

  console.log('User after update:', user);

  if (!user?.telegramChatId) {
    console.log('User does not have a Telegram chat ID yet. Skipping welcome message.');
    return user;
  }

  try {
    await this.telegramService.sendMessage(
      user.telegramChatId,
      `🎉 Hello ${user.name}!

Your WeatherGuard access has been approved.

You will now receive weather alerts automatically. 🌦️`,
    );

    console.log('Telegram message sent successfully');
  } catch (err) {
    console.error('Telegram Error:', err);
  }

  return user;
}

async connectTelegram(clerkId: string, chatId: string) {
  return this.userModel.findOneAndUpdate(
    { clerkId },
    {
      telegramChatId: chatId,
      notificationsEnabled: true,
    },
    {
      returnDocument: "after",
    },
  );
}

async setNotificationsEnabled(chatId: string, enabled: boolean) {
  return this.userModel.findOneAndUpdate(
    { telegramChatId: chatId },
    {
      notificationsEnabled: enabled,
    },
    {
      returnDocument: 'after',
    },
  );
}

async getApprovedUsers() {
  return this.userModel.find({
    status: UserStatus.APPROVED,
    telegramChatId: {
      $ne: '',
    },
    notificationsEnabled: {
      $ne: false,
    },
  });
}

async getApprovedCount() {
  return this.userModel.countDocuments({
    status: UserStatus.APPROVED,
  });
}
async getCurrentUser(clerkId: string) {
  return this.userModel.findOne({
    clerkId,
  });
}
async findByClerkId(clerkId: string) {
  return this.userModel.findOne({ clerkId });
}
}
