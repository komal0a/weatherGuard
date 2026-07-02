import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  clerkId: string;

  @Prop({
    default: '',
  })
  telegramChatId: string;

  @Prop({
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    default: true,
  })
  notificationsEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);