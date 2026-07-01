import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { ClerkAuthGuard } from './guards/clerk-auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ClerkAuthGuard,
    AdminGuard,
  ],
  exports: [
    ClerkAuthGuard,
    AdminGuard,
  ],
})
export class AuthModule {}